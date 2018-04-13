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

        $(".artists-result").show();

        // $(".artists-result").append(
        //   "<div class='artist'>"+
        //     "<img class='logo' style='width: 100px; height: 80px;' src=" +
        //     artist_logo + ">"+
        //     "<h6>" + artist_name + "</h6>"+
        //     // "<a href='#' id='view-album'"
        //     $("#view-album").on("click", viewAlbums(artist_name))+
        //   "</div>"
        // )



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
    $(".albums-result").show();
    // console.log(artist_name);
    
    let artistsAlbumUrl = "http://www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artist_name;

    $.ajax({
      url: artistsAlbumUrl,
      type: "GET",
      dataType: "json",
      success: function(data) {
        // console.log(data["album"]);
        for (let album of data["album"]) {
          // console.log(album);
          
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
