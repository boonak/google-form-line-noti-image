
function myFunction() {
  var token = 'XLhvk0SgRqFl9gFf9WgUGlKnXthVCry2Efdljc2I3f4'
  var ss = SpreadsheetApp.openById('1zuEWMzoRtYdtFeD8f4cPSFGY5XK_m9ysk4oosx9mlvQ')
  var sh = ss.getSheetByName('การตอบแบบฟอร์ม 1')
  var row = sh.getLastRow();
  var maxImageSize = 2500;
  var resizedWidth = 300;

  var today = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy")
  var time = Utilities.formatDate(new Date(), "GMT+7", "HH:mm")
  Logger.log(time)
  for (i = 2; i <= row; i++) {
    var workDate = Utilities.formatDate(sh.getRange(i, 2).getValue(), "GMT+7", "dd/MM/yyyy")
    var workName = sh.getRange(i, 3).getValue()
    var team = sh.getRange(i, 4).getValue()
    var imgUrl_before_1 = sh.getRange(i, 5).getValue()
    var imgUrl_before_2 = sh.getRange(i, 6).getValue()
    var imgUrl_after_1 = sh.getRange(i, 7).getValue()
    var imgUrl_after_2 = sh.getRange(i, 8).getValue()
    var remark = sh.getRange(i, 9).getValue()
    var status = sh.getRange(i, 10).getValue()
    // var imgID = imgUrl.split('https://drive.google.com/open?id=')[1]
    message = "\nงานวันที่: " + workDate + "\nชื่องาน: " + workName + "\nทีม: "+ team + "\nหมายเหตุ: " + remark

    var imgUrl_before_1_array = imgUrl_before_1.split(",");
    var imgUrl_before_2_array = imgUrl_before_2.split(",");
    var imgUrl_after_1_array = imgUrl_after_1.split(",");
    var imgUrl_after_2_array = imgUrl_after_2.split(",");
    Logger.log(imgUrl_after_2_array[0]=="")

    if(status=="sent"){

    }else{
      var options = {
        "method": "post",
        "payload": {
          "message": message,
          // "imageFile": ,
        },
        "headers": { "Authorization": "Bearer " + token }
      };

      UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
      sh.getRange(i, 10).setValue('sent');

      image_before_count = 0
      image_after_count = 0

        if(imgUrl_before_1_array[0]!=""){
          for (var i = 0; i < imgUrl_before_1_array.length; i++) {
            var imgID = imgUrl_before_1_array[i].split('https://drive.google.com/open?id=')[1]
            var image = DriveApp.getFileById(imgID).getBlob()
            var fileSizeInBytes = image.getBytes().length;
            var fileSizeInKB = fileSizeInBytes / 1024;
            Logger.log(fileSizeInKB)
            image_before_count++
            var message_text = "รูป before " + (image_before_count)
            if(fileSizeInKB > maxImageSize){
              var res = ImgApp.doResize(imgID, resizedWidth);
              image = res.blob
              sendLineNotify(message_text,image,token)
            }else{
              sendLineNotify(message_text,image,token)
            }      
          }
        }

        if(imgUrl_before_2_array[0]!=""){
          for (var i = 0; i < imgUrl_before_2_array.length; i++) {
            var imgID = imgUrl_before_2_array[i].split('https://drive.google.com/open?id=')[1]
            var image = DriveApp.getFileById(imgID).getBlob()
            var fileSizeInBytes = image.getBytes().length;
            var fileSizeInKB = fileSizeInBytes / 1024;
            Logger.log(fileSizeInKB)
            image_before_count++
            var message_text = "รูป before " + (image_before_count)
            if(fileSizeInKB > maxImageSize){
              var res = ImgApp.doResize(imgID, resizedWidth);
              image = res.blob
              sendLineNotify(message_text,image,token)
            }else{
              sendLineNotify(message_text,image,token)
            }      
          }
        }

        if(imgUrl_after_1_array[0]!=""){
          for (var i = 0; i < imgUrl_after_1_array.length; i++) {
            var imgID = imgUrl_after_1_array[i].split('https://drive.google.com/open?id=')[1]
            var image = DriveApp.getFileById(imgID).getBlob()
            var fileSizeInBytes = image.getBytes().length;
            var fileSizeInKB = fileSizeInBytes / 1024;
            Logger.log(fileSizeInKB)
            image_after_count++
            var message_text = "รูป after " + (image_after_count)
            if(fileSizeInKB > maxImageSize){
              var res = ImgApp.doResize(imgID, resizedWidth);
              image = res.blob
              sendLineNotify(message_text,image,token)
            }else{
              sendLineNotify(message_text,image,token)
            }      
          }
        }

        if(imgUrl_after_2_array[0]!=""){
          for (var i = 0; i < imgUrl_after_2_array.length; i++) {
            var imgID = imgUrl_after_2_array[i].split('https://drive.google.com/open?id=')[1]
            var image = DriveApp.getFileById(imgID).getBlob()
            var fileSizeInBytes = image.getBytes().length;
            var fileSizeInKB = fileSizeInBytes / 1024;
            Logger.log(fileSizeInKB)
            image_after_count++
            var message_text = "รูป after " + (image_after_count)
            if(fileSizeInKB > maxImageSize){
              var res = ImgApp.doResize(imgID, resizedWidth);
              image = res.blob
              sendLineNotify(message_text,image,token)
            }else{
              sendLineNotify(message_text,image,token)
            }      
        }
      }
    }
  }
}

function sendLineNotify(message,image, token) {
  var options = {
    "method": "post",
    "payload": {
      "message": message,
      "imageFile": image,
    },
    "headers": { "Authorization": "Bearer " + token }
  };
  UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}
