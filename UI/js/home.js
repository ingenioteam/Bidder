var highestBidder;
var myBidId;
$(document).ready(function(){
    var url ='https://bid-backend.herokuapp.com'
    // alert('working')
    $('#loader').removeClass('hide')
    getBidInformation();
    setInterval(getBids,20000);
  
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
            console.log(data)
            if(highestBidder){
                console.log('first Time....')
                 console.log('local stroage : '+window.localStorage.getItem('userId'));
                 console.log('Response : ',data.data[0].user._id);
                 console.log('Highest Bid : ',highestBidder);
                 console.log('Response Bid id : ', data.data[0]._id)
                if(highestBidder != data.data[0]._id && window.localStorage.getItem('userId') != data.data[0].user._id ){
                    console.log('calling')
                    myFunction(`${data.data[0]._id} Bidder has bid more than you`)
                    highestBidder = data.data[0]._id;
                } else{
                    highestBidder = data.data[0]._id;
                }
            }else{
                highestBidder = data.data[0]._id;
            }
            $('#loader').addClass('hide');
            $('.container').empty()
            console.log(window.localStorage.getItem('userId'))
            var count=1;
            var hasBid= false;
            var prePayment;
            var startAmount;
            if(window.localStorage.getItem('prePayment') && window.localStorage.getItem('startAmount')){
                prePayment = window.localStorage.getItem('prePayment');
                startAmount= window.localStorage.getItem('startAmount')
            }
            for(var i =0; i< data.data.length; i++){
                // console.log(data.data[i].user)
                
                count+=35;
                console.log(data.data[i].monthlyFee)
                if(+window.localStorage.getItem('startAmount') < +data.data[i].monthlyFee){
                    console.log(data.data[i].monthlyFee)
                    window.localStorage.setItem('startAmount',data.data[i].monthlyFee);
                }
                if(window.localStorage.getItem('userId') == data.data[i].user._id){
                    let newPrePayment = (data.data[i].monthlyFee*12 / 100)*prePayment;
                    hasBid = true;
                    myBidId = data.data[i]._id;
                    console.log('my Bid Id: '+myBidId);
                    console.log('Highest Bid Id:'+ data.data[0]._id)
                    console.log('caliing------->')
                   
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
                                <label for="Student" id='monthlyFeeLabel' >Monthly Fee:</label>
                                <label for="Student"  id='monthhideFeeLabel' class='hide errorLabelShow'>Monthly Fee</label>
                                <input type="number" class="form-control" value='${data.data[i].monthlyFee }' id='monthlyFee' required />
                            </div>
                            <div class="form-group col-md-4 float-left">
                            <label for="Student"  id='monthlyAdvLabel'>Monthly Advertisment Budget:</label>
                            <label for="Student"  id='monthlyhideAdvLabel' class='hide errorLabelShow'>Monthly Advertisment Budget:</label>
                            <input type="number" class="form-control" value='${data.data[i].advertisementMonthly }' id='advertisementMonthly' required />
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
                                Bidder ${data.data[i]._id}
                            </div>
                            <div class="card-body">
                            <div  class="form-group col-md-4 float-left">
                                Pre-payment: <span>$${newPrePayment}</span>
                                </div>
                                <div class="form-group col-md-4 float-left">
                                    Monthly Fee: <span>$${data.data[i].monthlyFee}</span>
                                </div>
                                <div class="form-group col-md-4 float-left">
                                    Monthly Advertisment Budget: <span>$${data.data[i].advertisementMonthly }</span>
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
                                <label for="Student" id='monthlyFeeLabel'>Monthly Fee:</label>
                                <label for="Student" id='monthhideFeeLabel' class='hide errorLabelShow'>Monthly Fee:</label>
                                <input type="number" class="form-control" value='' id='monthlyFee' required/>
                            </div>
                            <div class="form-group col-md-4 float-left">
                                <label for="Student" id='monthlyAdvLabel'>Monthly Advertisment Budget:</label>
                                <label for="Student" id='monthlyhideAdvLabel' class='hide errorLabelShow'>Monthly Monthly Advertisment Budget:</label>
                                <input type="number" class="form-control" value='' id='advertisementMonthly' required/>
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
    if($('#monthlyFee').val() && $('#advertisementMonthly').val()){
        let token = window.localStorage.getItem('token');
        var url ='https://bid-backend.herokuapp.com';
        console.log($('#monthlyFee').val());
        console.log(window.localStorage.getItem('startAmount'))
        if(+$('#monthlyFee').val() >= +window.localStorage.getItem('startAmount')){
            $('#loader').removeClass('hide')
            $('#container').addClass('hide')
            window.localStorage.setItem('startAmount',$('#monthlyFee').val())
            let val={
                monthlyFee:$('#monthlyFee').val(),
                advertisementMonthly:$('#advertisementMonthly').val() 
            }
             $.ajax({
             url:url+'/bid',
             type:"POST",
             data: JSON.stringify(val),
             dataType: 'json',
             contentType: "application/json",
             headers: {"Authorization": "Bearer "+token},
             success : function(data){
                // myFunction();
                myFunction('Bid added Successfully');
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
            dangerSnack("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid");
            // alert("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid")
        }
    } else{
        dangerSnack('Please enter both Monthly fee and Monthly advertisment budget')
    }

   
}
function updateBid(bidId){
    
    console.log(bidId)
    var token = window.localStorage.getItem('token');
    var url ='https://bid-backend.herokuapp.com';
    // monthlyFee,_id
    if($('#monthlyFee').val() && $('#advertisementMonthly').val()){
        let val={
            monthlyFee:$('#monthlyFee').val(),
            advertisementMonthly:$('#advertisementMonthly').val(),
            _id:bidId
        }
        console.log($('#monthlyFee').val());
        console.log( window.localStorage.getItem('startAmount'))
        if(+$('#monthlyFee').val() >= +window.localStorage.getItem('startAmount')){
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
                    getBids()
                    myFunction('Bid updated Successfully');
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
            dangerSnack("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid");
            // alert("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid")
        }
    } else if(!$('#monthlyFee').val() && !$('#advertisementMonthly').val()) {
        dangerSnack('Please enter both Monthly fee and Monthly advertisment budget')
        $('#monthlyhideAdvLabel').removeClass('hide');
        $('#monthlyAdvLabel').addClass('hide');
        $('#monthlyFeeLabel').addClass('hide');
        $('#monthhideFeeLabel').removeClass('hide');

    } else if($('#monthlyFee').val() && !$('#advertisementMonthly').val()){
        $('#monthlyhideAdvLabel').removeClass('hide');
        $('#monthlyAdvLabel').addClass('hide');
    } else if(!$('#monthlyFee').val() && $('#advertisementMonthly').val()){
        $('#monthlyFeeLabel').addClass('hide');
        $('#monthhideFeeLabel').removeClass('hide');

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
function updateDate(){

}


function myFunction(text) {
    console.log('calling')
    $('#snackbar').html(text)
    $('#snackbar').css('background-color:green')
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // x.innerText('Bid updated successfully..!')
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
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