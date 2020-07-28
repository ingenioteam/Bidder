var url ='https://bid-backend.herokuapp.com'
function login(){
    $('#loader').removeClass('hide');
    $('#container').addClass('hide');
   console.log($('#userName').val());
   let val={
       userName:$('#userName').val(),
       password:$('#password').val()
   }
    $.ajax({
    url:url+'/auth',
    type:"POST",
    data: JSON.stringify(val),
    dataType: 'json',
    contentType: "application/json",
    // headers: {"Authorization": "Bearer "+token},
    success : function(data){
        console.log(data);
        decodeToken(data.token);
      
        // window.localStorage.setItem('token',data.token);
        // console.log(data.token)
        // window.location.replace('./home.html')
    },
    error:function(e){
        console.log('Error',e);
        dangerSnack('userName or password is incorrect')
        $('#loader').addClass('hide');
        $('#container').removeClass('hide');
    }
    })
}
function decodeToken(token){
    $.ajax({
        url:url+'/auth/validate/token',
        type:"GET",
        dataType: 'json',
        contentType: "application/json",
        headers: {"Authorization": "Bearer "+token},
        success : function(data){
            console.log(data);
            window.localStorage.setItem('token',token);
            $('#loader').addClass('hide');
            // console.log(data._id)
            window.localStorage.setItem('userId',data.token._id);
            window.location.replace('./home.html')
        },
        error:function(e){
            console.log('Error',e);
            $('#loader').addClass('hide');
            $('#container').removeClass('hide');
        }
        })
}

function dangerSnack(text) {
    console.log('calling222')
    $('#snackbarTwo').html(text)
    // Get the snackbar DIV
    var x = document.getElementById("snackbarTwo");
    // x.innerText('Bid updated successfully..!')
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }