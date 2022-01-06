function preload() {
    song = loadSound("music.mp3");
    song = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    song.setVolume(1);
    song.rate(1);
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized!');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + "Right Wrist Y = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');
    circle(leftWristX, leftWristY, 20);
    numberleftWristY = Number(leftWristY);
    remove_decimals = floor(numberleftWristY);
    leftWrist_divide = remove_decimals/1000;
    volume = leftWrist_divide * 2;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}