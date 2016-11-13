const GET_USER_AIRPORT_URL = "/user/airport";
const GET_FLIGHT_URL = "https://api.sandbox.amadeus.com/v1.2/flights/extensive-search";
const AMADEUS_KEY = "3nWhAi9MARcfnjux7wwghgixAjSuLJhe";

class PhotoCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {selected: false, userAirport: this.props.userLocation, pictureAirport: this.props.airport };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userAirport: nextProps.userLocation,
      pictureAirport: nextProps.airport
    });
  }

  

  clicked() {
    if (window.tooltipInitiated == undefined) {
      $('.tooltipped').tooltip({delay: 50});
      window.tooltipInitiated = true;
    }
    this.setState({selected: true});
    $('.fade-bg').addClass('active');
    $(".container.gallery").addClass("push-back");


    var tagsString = "<h6>Tags</h6><br />";
    for (tag of this.props.tags) {
      tagsString += '<div class="chip">' + tag.text + '</div>'
      //tagsString += tag.text + " ";
    }

    var emotionsString = "<h6>Emotions</h6><br />";
    if (this.props.faces.length == 0) {
      emotionsString = "";
    }
    for (face of this.props.faces) {
      emotionsString += '<div class="chip">' + face.emotion + '</div>'
      //tagsString += tag.text + " ";
    }

    var cityString = "";
    if (this.props.photo.city && this.props.photo.city != "") {
      cityString = "<h6>City</h6><div class='chip'>" + this.props.photo.city + "</div>";
    }

    $('.material-tooltip#' + $('.selected-photo-info').data('tooltip-id') + " span").html("<h5>" + this.props.caption + "</h5><br /><br />" + tagsString + "<br />" + emotionsString + "<br />" + cityString);
    setTimeout(function(comp) {
          $(".selected-photo").removeClass("hide").removeClass("fadeOut").addClass("fadeIn");
          $(".selected-photo img").attr('src', comp[0].props.url);
          $(".selected-photo img").css({"top": $('body').scrollTop() + (screen.height / 2) - 100, left: screen.width / 2});
          $(".selected-photo-close").css({"top": $('body').scrollTop() - ($(".selected-photo img").height() / 2) + (screen.height / 2) - 100, left: screen.width / 2 - ($(".selected-photo img").width() / 2)});
          $(".selected-photo-info").css({"top": $('body').scrollTop() - ($(".selected-photo img").height() / 2) + (screen.height / 2) - 100, left: screen.width / 2 + ($(".selected-photo img").width() / 2)});
          $(".selected-photo-options").css({"top": $('body').scrollTop() + ($(".selected-photo img").height() / 2) + (screen.height / 2) - 60, left: screen.width / 2 });
    }, 150, [this])
    window.pictureActive = true;
    window.activePicture = this.props.photo;
    // this.getFlights();
  }

  componentDidMount() {
    setInterval(() => {
      var card = $('.photoCard.' + this.props.id);
      if (card.hasClass('hide')) {
        card.removeClass('hide').addClass('fadeInUp');
        setTimeout(() => {
          card.removeClass('fadeInUp');
        }, 1000);
      }
    }, 500)
  }

	render() {
    return (
      <div className={"photoCard col small-padding s12 center " + this.props.id + " animated hide"} onClick={this.clicked.bind(this)}>
        <a href="#">
          <div className={"card small-margin hoverable " + (this.state.selected ? "selected" : "")}>
            <div className="card-image">
              <img src={this.props.url} />
            </div>
          </div>
        </a>
      </div>
    );
  }

}