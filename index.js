$("form").submit(function (e) {

  e.preventDefault();
  let artist = $("#search-artist").val();
  let url = "http://www.theaudiodb.com/api/v1/json/1/search.php?s=" + artist;

  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: function (data) {
      if (data.artists == null) {
        alert("Artist not found");
        location.reload();
        $(".artist-form").children('input').val('');
      }
      else {
        let artist_name = data.artists[0]["strArtist"];
        let artist_logo = data.artists[0]["strArtistLogo"];

        $(".artists-result").show();

        $("#artist-logo").append("<img class='logo' src=" + artist_logo + " " + "style='width: 100px; height: 80px;'" + ">");

        $(".artist-name").append(artist_name);
        $("#view-album").show();
        $("#view-album").on("click", viewAlbums(artist_name));
        $(".artist-form").children('input').val('')
      }
    },
    error: function (error) {
      console.log("An error occured while getting the Artists");
    }
  });
});

function viewAlbums(artist_name) {
  return function () {
    $(".albums-result").show();
    
    let artistsAlbumUrl = "http://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artist_name;

    $.ajax({
      url: artistsAlbumUrl,
      type: "GET",
      dataType: "json",
      success: function(data) {
        for (let album of data["album"]) {          
          $(".albums-result").append(
            "<div class='album'>" +
              "<img class='album-photo' style='width: 100px; height: 80px;' src=" +         album.strAlbumThumb + ">"+
              "<h6>" + album.strAlbum + "</h6>"+
            "</div>"+
            "<br />"
          )
        }
      }
    })
  }
}
