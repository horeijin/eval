window.URL = window.URL || window.webkitURL;

const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList_1 = document.getElementById("fileList_1");
    fileList_2 = document.getElementById("fileList_2");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault();
}, false);

function handleFiles(files) {
  if (!files.length) {
    fileList_1.innerHTML = "<p>파일을 선택해 주세요!</p>";
  } else {
    fileList_1.innerHTML = "";
    const list = document.createElement("ul");
    fileList_1.appendChild(list);
    for (let i = 0; i < files.length; i++) {
      const aa = document.createElement("span");
      list.appendChild(aa);

      const info = document.createElement("span");
      info.src = window.URL.createObjectURL(files[i]);
      aa.appendChild(info);
      
      $.getJSON(info.src, function (data) {
          $.each(data, function (index, value) {
            $('#sel').append('<option value="' + value.wav + '">' + value.txt + '</option>');
            });
        });

      /*
      <js로 삭제>
      var child = document.getElementById("wave");
      child.removeChild(child);
      <jquery로 삭제>  
      $("#wave").remove();
      */

      $(document).ready(function () {
        $('#addError').click(function () {
            $('#addLi').append('<li>' + $("input[name=task]").val() + " <input type='radio' name='error' value=" + $("input[name=task]").val() + '>' + ' <a type="button" class="delete-li"><i class="fa fa-trash-o fa-fw"></i></a></li>');
        });
      });

      
      
      $('#sel').change(function () {
        $('#fileList_1').text(this.value);
        $('#fileList_2').text(this.options[this.selectedIndex].text);

        var url = this.value;
        var utter = this.options[this.selectedIndex].text
        
        var wavesurfer = WaveSurfer.create({
          container: '#waveform',
          waveColor: 'green',
          progressColor: 'white',
        });

        wavesurfer.load('wav/'+url);

        /* 클릭하면 안의 이벤트 발생 (jquery)
        $('#waveform').on("click",function(){
          
        });
        */
        // 이건 클릭하면 안의 이벤트 발생 (js 이벤트리스너)
        let playPause = document.querySelector('#playPause');
        playPause.addEventListener('click', function() {
          wavesurfer.playPause();
        });

          wavesurfer.on('play', function() {
            document.querySelector('#play').style.display = 'none';
            document.querySelector('#pause').style.display = '';
            $('#sel').change(function(){
              //console.log('지워짐');
              wavesurfer.destroy();
            });
          });
          wavesurfer.on('pause', function() {
            document.querySelector('#play').style.display = '';
            document.querySelector('#pause').style.display = 'none';
            
            $('#sel').change(function(){
              //console.log('지워짐');
              wavesurfer.destroy();
            });
          });

          wavesurfer.on('ready', function() {
            wavesurfer.play();
            document.getElementById("msg_1").innerText = utter.length;
            
          });

          wavesurfer.on('error', function(e) {
            console.warn(e);
          });
      });

      $("#addBtn").on('click', function(){
        var trCnt = $('#myTable tr').length;
        var modelNm = $('#model').val();
        var speakerNm = $('#speaker').val();
        var fileNm = $('#fileList_1').text();
        var stc = $('#fileList_2').text();
        var len = $('#msg_1').text();
        var err = $('input:radio[name="error"]:checked').val();
        var note = $('#note').val();
        var innerHtml = "";
        
        innerHtml += '<tr>';
        innerHtml += '<td>'+ trCnt +'</tc>';
        innerHtml += '<td>'+ modelNm +'</td>';
        innerHtml += '<td>'+ speakerNm +'</td>';
        innerHtml += '<td>'+ fileNm +'</td>';
        innerHtml += '<td style="text-align: left;">'+ stc +'</td>';
        innerHtml += '<td>'+ len +'</td>';
        innerHtml += '<td>'+ err +'</td>';
        innerHtml += '<td style="text-align: left;">'+ note +'</td>';
        innerHtml += '<td><a type="button" class="delete-row"><i class="fa fa-trash-o fa-fw"></i></a></td>';
        innerHtml += '</tr>';

        $('#myTable > tbody:last').append(innerHtml);
      });

      $(document).on("click", ".delete-li", function () {
        $(this).closest('li').remove();
      });

      $(document).on("click", ".delete-row", function () {
            $(this).closest('tr').remove();
        });

      $(document).ready(function (){
        $("#btnExport").click(function (){
          $("#myTable").excelexportjs({ containerid: "myTable" , datatype: 'table' });
        });
      });
      
      info.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }

    }
  }
}
