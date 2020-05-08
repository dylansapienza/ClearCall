var getUserMedia = (function (){
	if(navigator.getUserMedia){
		return navigator.getUserMedia.bind(navigator)
	}
	if(navigator.webkitGetUserMedia){
		return navigator.webkitGetUserMedia.bind(navigator)
	}
	if(navigator.mozGetUserMedia){
		return navigator.mozGetUserMedia.bind(navigator)
	}
})();

function onRecieveStream(stream){
	if(document.querySelector('video')){
		console.log("User Already In Call!");
	}
	else{
		var video = document.createElement('video');
		var vidElement = document.getElementById('viewvid');
		vidElement.appendChild(video);
		video.srcObject = stream;
		video.play();
		}
	}
	// var video = document.querySelector('video');
	// console.log(video);
	// video.srcObject = stream;
	// video.onloadedmetadata = function(e){
	// 	console.log('Now playing the video');
	// 	video.play();
	// }

$(document).ready(function(){
	$("#start").click(function(){
		$("#jumbo").remove();
		$("#intro").show();
	});

	$("#host").click(function(){
		$("#intro").remove();
        $("#hostdiv").show();

    });
    
    $("#opencall").click(function(){
        var peer = new Peer();
        peer.on('open', (id) =>{
            $('#idgen').text("ID: " + id);
		});
		peer.on('call', function(call){
			getUserMedia({video: true, audio: true}, function(stream){
				console.log('Call incoming!');
				$("#hostdiv").remove();
				$("#videocall").show();
				call.answer(stream);
				call.on('stream', function(remoteStream){
					console.log(remoteStream);
					onRecieveStream(remoteStream);
				});
			}, function(err){
				console.log('Failed to get local stream', err);
			});
		});
    });

	$("#join").click(function(){
		$("#intro").remove();
		$("#joindiv").show();
	});

	$("#joincall").click(function(){
		
		
        var person_to_call = document.getElementById("partnerid").value;
				console.log('Calling ' + person_to_call);
                
            var peer = new Peer();
            getUserMedia({video: true, audio: true}, function(stream){
                var call = peer.call(person_to_call, stream);
                call.on('stream', function(remoteStream){
					console.log(remoteStream);
					$("#joindiv").remove();
					$("#videocall").show();
                    onRecieveStream(remoteStream);
                });
            }, function(err){
				console.log('Failed to get local stream', err);
        });
	});
	
	$("#hangup").click(function(){
		$("#videocall").remove();
		//Make Peer Global To Disconnect Anywhere in function
		peer.disconnect();
		$("#hungup").show();
	});


});


