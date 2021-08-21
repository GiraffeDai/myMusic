function checkLength(inp, v, max) {
  if (v.length >= max) {
    v = v.slice(0, max);
    inp.parentElement.childNodes.forEach(element => {
      if (element.id == "wLab") {
        element.remove();
      }
    });
    var wLab = document.createElement('Label');
    wLab.innerText = "已達到字數上限" + max + "字!";
    wLab.id = "wLab";
    wLab.className = "wLab";
    inp.parentElement.appendChild(wLab)
  } else {
    inp.parentElement.childNodes.forEach(element => {
      if (element.id == "wLab") {
        element.remove();
      }
    });
  }
  return v;
}

function send(btn) {
  var allparameter = document.querySelectorAll(".paramerDiv>input");
  var allName = ['歌曲名: ', '音樂連結: ', '歌手: ', '作詞: ', '作曲: ', '風格類型: ', '歌詞連結: '];
  if (allName.length != allparameter.length) {
    return showErrorAlert('發生錯誤，請重整頁面');
  }
  var songNameInput = allparameter[0];
  if (songNameInput.value.length <= 0) {
    return showErrorAlert('歌曲名，必填');
  }
  var songLinkInput = allparameter[1];
  if (songLinkInput.value.length <= 0) {
    return showErrorAlert('音樂連結，必填');
  }
  if (songLinkInput.value.indexOf("http") == -1) {
    return showErrorAlert('請檢查音樂連結是否為有效連結');
  }
  var layicLinkInput = allparameter[6];
  if (layicLinkInput.value.length > 0) {
    if (layicLinkInput.value.indexOf("http") == -1) {
      return showErrorAlert('請檢查歌詞連結是否為有效連結');
    }
  }

  btn.disabled = true;
  setTimeout(function () {
    btn.disabled = false;
  }, 2000);

  var content = "════════════════════\n";
  for (var i = 0; i < allName.length; i++) {
    if (allparameter[i].value.length > 0) {
      content += "▎" + allName[i] + allparameter[i].value + '\n';
    }
  }
  content += "════════════════════\n";

  fetch(
    'https://discord.com/api/webhooks/878476376188022794/OpgE8-Fs_PS0FsUV_s7DNY5VtE1yqnVV9rCG4pfVLngPEl2qvxI5WGh_MmbtvJwwqEuL', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
      }),
    }
  ).then(function (response) {
    songNameInput.value = "";
    songLinkInput.value = "";
    layicLinkInput.value = "";
    if (response["status"] != null) {
      if (response["status"] == 204) {
        showSuccessAlert("送出成功")
      } else {
        showErrorAlert('發生錯誤，請稍後再試');
      }
    }
  });
}

function showSuccessAlert(message) {
  Swal.fire({
    icon: 'success',
    text: message
  });
}

function showErrorAlert(message) {
  Swal.fire({
    icon: 'error',
    text: message
  });
}
