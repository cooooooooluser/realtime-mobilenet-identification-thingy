function setup() {
   canvas=createCanvas(300,300);
   canvas.center();
   video=createCapture(VIDEO);
   video.hide();
   //imageClassifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/v_sl95BzE/model.json",modelLoaded);
   imageclassifier= ml5.imageClassifier("MobileNet", modelLoaded);

}

function draw() {
    image(video, 0, 0, 300,300);
    console.log("finished");
   imageclassifier.classify(video, gotResult);
}

function modelLoaded() {
   console.log("modelLoaded")
}
  
previous_results= " ";

function gotResult(error, results) {
   if (error){
      console.error(error);
   }
   else{
      console.log(results);
      if ((results[0].confidence>0.5) && (previous_results!= results[0].label)){
         previous_results = results[0].label;
         var synth= window.speechSynthesis;
         speechData="Object Detected is" + results[0].label;
         var utter=new SpeechSynthesisUtterance(speechData);
         synth.speak(utter);
      
      document.getElementById("object_value").innerHTML=results[0].label;
      document.getElementById("Acurracy_number").innerHTML=results[0].confidence.toFixed(3);
      
   }}


}

