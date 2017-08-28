(document).ready(function () {
  $('#foo').on('submit', function (event) {
    event.preventDefault()

    $('#foo').on('submit', function () {
      let address = $('#address').val().trim()

      console.log(address)

      $.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyASKzZcbHtq0neqrjQ26hmsX_Wj7oj9t7Q&callback=initMapa', {
        near_addr: address,
        distance: 5,
        per_page: 10
      }, success)
    })

    function success(data) {
      console.log(data)
    }
  })
})
