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
      }
      else {
        let artist_name = data.artists[0]["strArtist"];
        let artist_logo = data.artists[0]["strArtistLogo"];
        $("#artist-logo").append("<img class='logo' src=" + artist_logo + " " + "style='width: 100px; height: 80px;'" + ">");

        $(".artist-name").append(artist_name);
        $("#view-album").show();

        $("#view-album").on("click", viewAlbums(artist_name));
      }
    },
    error: function (error) {
      console.log("An error occured while getting the Artists");
    }
  });
});

function viewAlbums(artist_name) {
  return function () {
    console.log(artist_name);
  }
}
