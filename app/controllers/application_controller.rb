require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :get_info, :except => [:login]

  @@client_id = "de0534bfebd644c6b8264da9c1cff6c6"
  @@client_secret = "52176792ef1e4cb98f13cdbab2689c2e"
  @@redirect_uri = Rails.env.development? ? "http://localhost:3000/login" : "https://filterz.herokuapp.com/login"

  def get_info
    @user = User.find_by(uid: session[:access_token])
  end

  def root
    if @user.nil?
      redirect_to "https://api.instagram.com/oauth/authorize/?client_id=" + @@client_id + "&redirect_uri=" + @@redirect_uri + "&response_type=code"
    else
      @string = "I'm logged in son: " + @user.name
    end
  end


  def login
    code = params[:code]
    if !code.nil?
      response = Unirest.post "https://api.instagram.com/oauth/access_token",
                              parameters: {client_id: @@client_id,
                                           client_secret: @@client_secret,
                                           grant_type: 'authorization_code',
                                           code: code,
                                           redirect_uri: @@redirect_uri
                                          }
      user = response.body["user"]
      token = response.body["access_token"]
      if User.find_by(uid: token).nil?
        User.create({ uid: token, name: user["full_name"] })
      end
      session[:access_token] = token
    end

    redirect_to action: "root" and return
  end

  def privacy
    render file: "privacypolicy.htm"
  end

  def new_image

    photo = Photo.create(url: params[:url], user_id: @user.id)
    
    render json: { "tags": photo.tags, "captions": photo.captions }
  end

end
