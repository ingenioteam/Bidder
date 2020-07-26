
$(document).ready(function(){
    var url ='https://bid-backend.herokuapp.com'
    // alert('working')
    $('#loader').removeClass('hide')
    getBidInformation();
})
function getBids(){
    let token = window.localStorage.getItem('token');
    console.log(token);
    var url ='https://bid-backend.herokuapp.com'
    $.ajax({
        url:url+'/admin',
        type:"GET",
        dataType: 'json',
        contentType: "application/json",
        headers: {"Authorization": "Bearer "+token},
        success : function(data){
            $('#loader').addClass('hide')
            console.log(data);
            console.log(window.localStorage.getItem('userId'))
            var hasBid= false;
            var prePayment;
            var startAmount;
            if(window.localStorage.getItem('prePayment') && window.localStorage.getItem('startAmount')){
                prePayment = window.localStorage.getItem('prePayment');
                startAmount= window.localStorage.getItem('startAmount')
            }
            for(var i =0; i< data.data.length; i++){
                // console.log(data.data[i].user)
                if(+window.localStorage.getItem('startAmount') < +data.data[i].monthlyFee){
                    console.log(data.data[i].monthlyFee)
                    window.localStorage.setItem('startAmount',data.data[i].monthlyFee);
                }
                if(window.localStorage.getItem('userId') == data.data[i].user){
                    let newPrePayment = (data.data[i].monthlyFee*12 / 100)*prePayment;
                    hasBid = true;
                    $('.container').append(
                    `<div class="card" style="margin-top: 5vh;">
                        <div class="card-header" style="text-align: center;">
                            You
                        </div>
                        <div class="card-body">
                            <div  class="form-group col-md-4 float-left">
                                <label for="Student">Pre-payment:</label>
                                <input name="Student" class="form-control" value='${newPrePayment}' readonly />
                            </div>
                        
                            <div class="form-group col-md-4 float-left">
                                <label for="Student">Monthly Fee:</label>
                                <input type="text" class="form-control" value='${data.data[i].monthlyFee }' id='monthlyFee'/>
                            </div>
                            <div class="row">
                                <div class="col-md-5"></div>
                            <div class="col-md-2 "style='margin-bottom:2vh'>
                                <button class="btn btn-primary" onclick="updateBid('${data.data[i]._id}')">Update Bid</button>
                            </div>
                            </div>
                        </div>
                    </div>`
                    )
                }else{
                    let newPrePayment = (data.data[i].monthlyFee*12 / 100)*prePayment;
                    $('.container').append(`
                        <div class="card" style="margin-top: 5vh;">
                            <div class="card-header" style="text-align: center;">
                                Bider 3145
                            </div>
                            <div class="card-body">
                            <div  class="form-group col-md-4 float-left">
                                Pre-payment: <span>$${newPrePayment}</span>
                                </div>
                                <div class="form-group col-md-4 float-left">
                                    Monthly Fee: <span>$${data.data[i].monthlyFee}</span>
                                </div>
                                <div class="row">
                                    <div class="col-md-2 offset-md-10">
                                </div>
                            </div>
                            </div>
                        </div>
                    `)
                }
            }
            if(!hasBid){
                console.log('calling !hasBid')
                $('.container').append(
                    `<div class="card" style="margin-top: 5vh;">
                        <div class="card-header" style="text-align: center;">
                            You
                        </div>
                        <div class="card-body">
                            <div  class="form-group col-md-4 float-left">
                                <label for="Student">Pre-payment:</label>
                                <input name="Student" class="form-control" id='prePayment' value='' readonly />
                            </div>
                        
                            <div class="form-group col-md-4 float-left">
                                <label for="Student">Monthly Fee:</label>
                                <input type="text" class="form-control" value='' id='monthlyFee'/>
                            </div>
                            <div class="row">
                                <div class="col-md-5"></div>
                            <div class="col-md-2 "style='margin-bottom:2vh'>
                                <button class="btn btn-primary" onclick="addBid()">Raise Bid</button>
                            </div>
                            </div>
                        </div>
                    </div>`
                )
            }
            
        },
        error:function(e){
            console.log('Error',e)
        }
        })
}
function addBid(){
    let token = window.localStorage.getItem('token');
    var url ='https://bid-backend.herokuapp.com';
    console.log($('#monthlyFee').val());
    console.log(window.localStorage.getItem('startAmount'))
    if(+$('#monthlyFee').val() > +window.localStorage.getItem('startAmount')){
        $('#loader').removeClass('hide')
        $('#container').addClass('hide')
        window.localStorage.setItem('startAmount',$('#monthlyFee').val())
        let val={
            monthlyFee:$('#monthlyFee').val()
        }
         $.ajax({
         url:url+'/bid',
         type:"POST",
         data: JSON.stringify(val),
         dataType: 'json',
         contentType: "application/json",
         headers: {"Authorization": "Bearer "+token},
         success : function(data){
             console.log(data);
             $('#loader').addClass('hide');
             $('#container').removeClass('hide')
             $('#prePayment').val((($('#monthlyFee').val()*12) / 100)*window.localStorage.getItem('prePayment'))
            //  decodeToken(data.token);
             // window.localStorage.setItem('token',data.token);
             // console.log(data.token)
             // window.location.replace('./home.html')
         },
         error:function(e){
             console.log('Error',e)
         }
         })
    } else{
        alert('Sorry')
    }
   
}
function updateBid(bidId){
    
    console.log(bidId)
    var token = window.localStorage.getItem('token');
    var url ='https://bid-backend.herokuapp.com';
    // monthlyFee,_id
    let val={
        monthlyFee:$('#monthlyFee').val(),
        _id:bidId
    }
    console.log($('#monthlyFee').val());
    console.log( window.localStorage.getItem('startAmount'))
    if(+$('#monthlyFee').val() > +window.localStorage.getItem('startAmount')){
        // console.log('Calling')
        window.localStorage.setItem('startAmount',$('#monthlyFee').val())
        $('#loader').removeClass('hide');
        $('#container').addClass('hide');
        $.ajax({
            url:url+'/bid',
            type:"PATCH",
            data: JSON.stringify(val),
            dataType: 'json',
            contentType: "application/json",
            headers: {"Authorization": "Bearer "+token},
            success : function(data){
                console.log(data);
                $('#loader').addClass('hide');
                $('#container').removeClass('hide')
               //  decodeToken(data.token);
                // window.localStorage.setItem('token',data.token);
                // console.log(data.token)
                // window.location.replace('./home.html')
            },
            error:function(e){
                console.log('Error',e);
                $('#loader').addClass('hide');
            }
        })
    } else{
        alert('sorry')
    }
  
}
function getBidInformation(){
    // /get/bid/info
    let token = window.localStorage.getItem('token');
    var url ='https://bid-backend.herokuapp.com'
 
     $.ajax({
     url:url+'/bid/get/info',
     type:"GET",
     dataType: 'json',
     contentType: "application/json",
     headers: {"Authorization": "Bearer "+token},
     success : function(data){
         console.log(data);
         window.localStorage.setItem('prePayment', data.result.prePayment);
         window.localStorage.setItem('startAmount',data.result.startAmount);
         getBids();
        //  decodeToken(data.token);
         // window.localStorage.setItem('token',data.token);
         // console.log(data.token)
         // window.location.replace('./home.html')
     },
     error:function(e){
         console.log('Error',e)
     }
     })
}


