$(document).ready(function(){
  // on clicks
  $(document).on("click", ".login-modal", function () {
    $("#myModal").modal('show');
    return false
  });
  // end login button / modal function

  // sign up button start
  $(document).on("click", ".signUp", function () {
    $("#signUpModal").modal('show');
    $('#myModal').modal('hide')
    return false
  });
  //end sign up button

  // Search Button
  $(document).on("click", ".go", function () {
    console.log("searched")
  });
});