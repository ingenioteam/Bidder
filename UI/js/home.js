var highestBidder;
var myBidId;
// var monthly
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
    $('#updateBid').attr("disabled", true);
    $.ajax({
        url:url+'/admin',
        type:"GET",
        dataType: 'json',
        contentType: "application/json",
        headers: {"Authorization": "Bearer "+token},
        success : function(data){
            console.log(data)
            if(data.data.length > 0){
                if(highestBidder){
                    console.log('first Time....')
                     console.log('local stroage : '+window.localStorage.getItem('userId'));
                     console.log('Response : ',data.data[0].user._id);
                     console.log('Highest Bid : ',highestBidder);
                     console.log('Response Bid id : ', data.data[0]._id)
                    if(highestBidder != data.data[0]._id && window.localStorage.getItem('userId') != data.data[0].user._id ){
                        console.log('calling')
                        myFunction(`${data.data[0]._id.substring(17)} Bidder Placed new bid`)
                        highestBidder = data.data[0]._id;
                    } else{
                        highestBidder = data.data[0]._id;
                    }
                }else{
                    highestBidder = data.data[0]._id;
                }
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
                            <div  class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Pre-payment:</small>
                                </label>
                                <input name="Student" class="form-control" id='prePayment' value='${data.data[i].prePayment }'  />
                            </div>
                            <div  class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Raise Amount:</small>
                                </label>
                                <select class='form-control' onchange="changePrePayment(this);">
                                        <option value="0">Select Raise</option>
                                        <option value="1000">1000</option>
                                        <option value="2000">2000</option>
                                        <option value="3000">3000</option>
                                        <option value="4000">4000</option>
                                        <option value="5000">5000</option>
                                        <option value="6000">6000</option>
                                        <option value="7000">7000</option>
                                        <option value="8000">8000</option>
                                        <option value="9000">9000</option>
                                        <option value="10000">10000</option>
                                    </select>
                                </div>
                        
                            <div class="form-group col-md-2 float-left">
                                <label for="Student" id='monthlyFeeLabel' >
                                    <small style='font-size:70%'>Monthly Fee:</small>
                                </label>
                                <label for="Student"  id='monthhideFeeLabel' class='hide errorLabelShow'>Monthly Fee</label>
                                <input type="number" class="form-control" value='${data.data[i].monthlyFee }' id='monthlyFee'  />
                            </div>
                            <div class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Raise Amount:</small>
                                </label>
                                <select class='form-control' onchange="changemonthlyFee(this);">
                                    <option value="0">Select Raise</option>
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                    <option value="6000">6000</option>
                                    <option value="7000">7000</option>
                                    <option value="8000">8000</option>
                                    <option value="9000">9000</option>
                                    <option value="10000">10000</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2 float-left">
                                <label for="Student"  id='monthlyAdvLabel'>
                                    <small style='font-size:70%'>Monthly Advertisment Budget:</small>
                                </label>
                                <label for="Student"  id='monthlyhideAdvLabel' class='hide errorLabelShow'>Monthly Advertisment Budget:</label>
                                <input type="number" class="form-control" value='${data.data[i].advertisementMonthly }' id='advertisementMonthly'  />
                            </div>
                            <div class="form-group col-md-2 float-left">
                            <label for="Student">
                                <small style='font-size:70%'>Raise Amount:</small>
                            </label>
                            <select class='form-control' onchange="changeAdvFee(this);">
                                    <option value="0">Select Raise</option>
                            
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                    <option value="6000">6000</option>
                                    <option value="7000">7000</option>
                                    <option value="8000">8000</option>
                                    <option value="9000">9000</option>
                                    <option value="10000">10000</option>
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-md-5"></div>
                            <div class="col-md-2 "style='margin-bottom:2vh'>
                                <button class="btn btn-primary" id='updateBid' disabled onclick="updateBid('${data.data[i]._id}')">Raise Bid</button>
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
                                Bidder ${data.data[i]._id.substring(17)}
                            </div>
                            <div class="card-body">
                            <div  class="form-group col-md-4 float-left">
                                Pre-payment: <span>$${data.data[i].prePayment}</span>
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
                            <div  class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Pre-payment:</small>
                                </label>
                                <input name="Student" class="form-control" value='10000'  id='prePayment'/>
                            </div>
                            <div class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Raise Amount:</small>
                                </label>
                                <select class='form-control' onchange="changePrePayment(this);">
                                <option value="0">Select Raise</option>
                             
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                    <option value="6000">6000</option>
                                    <option value="7000">7000</option>
                                    <option value="8000">8000</option>
                                    <option value="9000">9000</option>
                                    <option value="10000">10000</option>
                                </select>
                            </div>
                        
                            <div class="form-group col-md-2 float-left">
                                <label for="Student" id='monthlyFeeLabel'>
                                    <small style='font-size:70%'>Monthly Fee:</small>
                                </label>
                                <input type="number" class="form-control" value='10000' id='monthlyFee'  required/>
                            </div>
                            <div  class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Raise Amount:</small>
                                </label>
                                <select class='form-control' onchange="changemonthlyFee(this);">
                                <option value="0">Select Raise</option>
                        
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="6000">6000</option>
                                <option value="7000">7000</option>
                                <option value="8000">8000</option>
                                <option value="9000">9000</option>
                                <option value="10000">10000</option>
                                </select>
                            </div>
                            <div class="form-group col-md-2 float-left">
                                <label for="Student" id='monthlyAdvLabel'>
                                    <small style='font-size:70%'>Monthly Advertisment Budget:</small>
                                </label>
                                <input type="number" class="form-control" value='10000' id='advertisementMonthly' />
                            </div>
                            <div  class="form-group col-md-2 float-left">
                                <label for="Student">
                                    <small style='font-size:70%'>Raise Amount:</small>
                                </label>
                                <select class='form-control' onchange="changeAdvFee(this);">
                                <option value="0">Select Raise</option>
                     
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="3000">3000</option>
                                <option value="4000">4000</option>
                                <option value="5000">5000</option>
                                <option value="6000">6000</option>
                                <option value="7000">7000</option>
                                <option value="8000">8000</option>
                                <option value="9000">9000</option>
                                <option value="10000">10000</option>
                                </select>
                            </div>
                            <div class="row">
                                <div class="col-md-5"></div>
                            <div class="col-md-2 "style='margin-bottom:2vh'>
                                <button class="btn btn-primary" onclick="addBid()">Initiate Bid</button>
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
    // if($('#monthlyFee').val() && $('#advertisementMonthly').val()){
        let token = window.localStorage.getItem('token');
        var url ='https://bid-backend.herokuapp.com';
        // var url = 'https://f0771a5fe02f.ngrok.io'
        console.log($('#monthlyFee').val());
        console.log(window.localStorage.getItem('startAmount'))
        // if(+$('#monthlyFee').val() >= +window.localStorage.getItem('startAmount')){
            $('#loader').removeClass('hide')
            $('#container').addClass('hide')
            window.localStorage.setItem('startAmount',$('#monthlyFee').val())
            let val={
                monthlyFee:$('#monthlyFee').val(),
                advertisementMonthly:$('#advertisementMonthly').val(),
                prePayment:$('#prePayment').val()
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
                //  $('#prePayment').val((($('#monthlyFee').val()*12) / 100)*window.localStorage.getItem('prePayment'))
                //  decodeToken(data.token);
                 // window.localStorage.setItem('token',data.token);
                 // console.log(data.token)
                 // window.location.replace('./home.html')
             },
             error:function(e){
                 console.log('Error',e)
             }
             })
        // } else{
            // dangerSnack("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid");
            // alert("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid")
        // }
    // } else{
        // dangerSnack('Please enter both Monthly fee and Monthly advertisment budget')
    // }

   
}
function updateBid(bidId){
    
    console.log(bidId)
    var token = window.localStorage.getItem('token');
    var url ='https://bid-backend.herokuapp.com';
    // var url = 'https://f0771a5fe02f.ngrok.io'
    // monthlyFee,_id
    // if($('#monthlyFee').val() && $('#advertisementMonthly').val()){
        let val={
            monthlyFee:$('#monthlyFee').val(),
            advertisementMonthly:$('#advertisementMonthly').val(),
            prePayment:$('#prePayment').val(),
            _id:bidId
        }
        // console.log(val)
        // console.log($('#monthlyFee').val());
        // console.log( window.localStorage.getItem('startAmount'))
        // if(+$('#monthlyFee').val() >= +window.localStorage.getItem('startAmount')){
            // console.log('Calling')
            // window.localStorage.setItem('startAmount',$('#monthlyFee').val())
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
        // } else{
            // dangerSnack("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid");
            // alert("Sorry..!!! You can't Bid less than starting amount or Less than competitor's bid")
        // }
    // } else if(!$('#monthlyFee').val() && !$('#advertisementMonthly').val()) {
    //     dangerSnack('Please enter both Monthly fee and Monthly advertisment budget')
    //     $('#monthlyhideAdvLabel').removeClass('hide');
    //     $('#monthlyAdvLabel').addClass('hide');
    //     $('#monthlyFeeLabel').addClass('hide');
    //     $('#monthhideFeeLabel').removeClass('hide');

    // } else if($('#monthlyFee').val() && !$('#advertisementMonthly').val()){
    //     $('#monthlyhideAdvLabel').removeClass('hide');
    //     $('#monthlyAdvLabel').addClass('hide');
    // } else if(!$('#monthlyFee').val() && $('#advertisementMonthly').val()){
    //     $('#monthlyFeeLabel').addClass('hide');
    //     $('#monthhideFeeLabel').removeClass('hide');

    // }

  
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
    x.className = "row show";
  
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
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
  }

function changePrePayment(e){
    $('#updateBid').removeAttr("disabled");
    console.log(e.value);
    var prePaymentOldValue = $('#prePayment').val();
    console.log(prePaymentOldValue);
    $('#prePayment').val(+prePaymentOldValue+(+e.value) )
}
function changemonthlyFee(e){
    $('#updateBid').removeAttr("disabled");
    var monthlyFee= $('#monthlyFee').val()
    $('#monthlyFee').val(+monthlyFee+(+e.value) )
}

function  changeAdvFee(e){
$('#updateBid').removeAttr("disabled");
 var monthlyAdvOldValue= $('#advertisementMonthly').val();
 $('#advertisementMonthly').val(+monthlyAdvOldValue+(+e.value))
}