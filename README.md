# ReLive - CALHACKS 2016

[Live Preview](http://www.relive-calhacks.herokuapp.com)

[Devpost](https://devpost.com/software/relive-3q4fta)

[Promo Video](https://www.youtube.com/watch?v=BnPheoPr0GU)

## Inspiration

Our inspiration for ReLive was that we wanted a way to return and re-experience our best moments and memories. By creating a smart photo gallery, we are able to reminisce and find a way to "ReLive" life's greatest moments.

## What it does

ReLive is an intelligent photo gallery that uses Microsoft's Cognitive Services API (Machine Learning and Artificial Intelligence) to analyze and automatically caption and tag photos, and recognize emotional and sentiments from photos. Additionally, using Microsoft's Bing Speech-To-Text API and Language Understanding Intelligent Service (LUIS), we are able to accept spoken natural language commands and recognize them as action in the application. For example, a person may filter photos by saying "Find photos of mountains" to filter by all photos related to mountains. When a user comes across a photo that reminds them of a moment they miss, they may "ReLive" the moment which immediately finds the best flight option to the location in the photo using the Amadeus API. The user can then book the flight and pay using the Square API. Throughout this experience, the application learns from every command from the user takes and uses that to improve the experience.

## How we built it

We spent most of our time working on implementing the APIs into our Ruby-on-Rails backend for image recognition, emotion analysis, Square payments, and Amadeus flight information. The front-end of our application also took a significant amount of time as we learned some new CSS3 features including 3D animations.
