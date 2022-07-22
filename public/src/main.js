let db = firebase.firestore(); // データベースに関する機能の取得

// 保持されている全てのタスクデータを取得し、表示する
function getAll() {
  let collection = db.collection("tasks").orderBy('create_at', 'asc'); // 作成された順にデータを並べてタスクデータをデータベースから取得する
  collection.get().then((querySnapshot) => { // 取得したデータを読み取る
    $('#list').text('') // タスクをリスト表示するための箇所（<div id="list"></div>）を空文字に設定（初期化）

    // 変数の初期化
    outputAll = [];
    num = 0;

    querySnapshot.forEach((doc) => { // 取得したデータそれぞれ1つづつのデータに対して
      let status = "";
      if (doc.data()['done']) {
        status = "checked"
      } // タスクが完了の状態になっているかの判定
      // リスト表示するための箇所（ <div id="list"></div> ）にタスクを最下端に追加
      $('#list').append(' \
  <div class="row mx-auto"> \
    <div class="col-sm"> \
      <form class="form-inline"> \
        <div class="custom-control custom-checkbox"> \
          <input value="' + doc.id + '" type="checkbox" class="custom-control-input" id="customCheck' + num +
        '" ' + status + ' onclick="check(this);"> \
          <label class="custom-control-label" for="customCheck' + num + '"> \
            <p>' + doc.data()['name'] + '\
              [<a value="' + doc.id + '" data-toggle="modal" data-target="#editModal" onclick="showEditModal(this)"> <span class="fontBlue">edit</span> </a>] \
              [<a value="' + doc.id + '" data-toggle="modal" data-target="#editModal" onclick="showDeleteModal(this)"> <span class="fontRed">x</span> </a>] \
            </p> \
          </label> \
        </div> \
      </form> \
    </div> \
  </div>');
      num++;
    });
  });
}
getAll(); // 保持されている全てのタスクデータ取得の初期実行（これがないと、画面を開いたときに何も表示されない）

// タスクを追加する
function add() {
  let taskNameForAdd = $("#taskNameForAdd").val(); // inputbox に入力された値を取得する
  if (taskNameForAdd == "") return; // もし、inputbox が空だった場合は関数を終了する

  db.collection("tasks").add({ // データベースにタスクを追加する
      name: taskNameForAdd, // 入力されたタスク名
      done: false, // タスクの完了状態は最初は未の状態のため false を指定
      create_at: new Date() // 現在時刻
    }).then(function (docRef) { // 成功した場合に実行される箇所
      getAll(); // 保持されている全てのタスクデータを取得し、表示する
      $("#taskNameForAdd").val(''); // inputbox に入力された値を空にする
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error adding document: ", error);
    });
}

// タスクを削除する
function del() {
  db.collection("tasks").doc($('#docId').val()).delete() // $('#docId').val() で削除する対象データのIDを取得し、そのデータに対して削除を行う
    .then(function () { // 成功した場合に実行される箇所
      console.log("Document successfully deleted!");
      $('#list').text = "" // タスクをリスト表示するための箇所（<div id="list"></div>）を空文字に設定（初期化）
      $("#editModal").modal('toggle'); // Modal の表示を OFF にする
      getAll(); // 保持されている全てのタスクデータを取得し、表示する
    }).catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error removing document: ", error);
    });
}

// タスクを更新する
function update() {
  let taskNameForEdit = $("#taskNameForEdit").val(); // inputbox に入力された値を取得する
  if (taskNameForEdit == "") return; //　もし、inputbox が空だった場合は関数を終了する

  collection = db.collection("tasks").doc($('#docId').val())
    .update({ // $('#docId').val() で削除する対象データのIDを取得し、そのデータに対して更新を行う
      name: taskNameForEdit, // 入力されたタスク名
    }).then(function () { // 成功した場合に実行される箇所
      console.log("Document successfully updated!");
      $('#list').text = "" // タスクをリスト表示するための箇所（<div id="list"></div>）を空文字に設定（初期化）
      $("#editModal").modal('toggle'); // Modal の表示を OFF にする
      getAll(); // 保持されている全てのタスクデータを取得し、表示する
      $("#taskNameForEdit").val(''); // inputbox に入力された値を空にする
    }).catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error removing document: ", error);
    });
}

// タスクの完了、未完了を制御する
function check(elm) {
  db.collection("tasks").doc(elm.getAttribute('value'))
    .update({ // elm.getAttribute('value') で削除する対象データのIDを取得し、そのデータに対して更新を行う
      done: elm.checked, // 対象要素のチェック状態
    }).then(function () { // 成功した場合に実行される箇所
      console.log("Document successfully updated!");
    }).catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error removing document: ", error);
    });
}

// タスク更新のためのモーダルを表示する
function showEditModal(elm) {
  $('#docId').val(elm.getAttribute('value')); // 選択したタスクデータのID を <input type="hidden" id="docId"> に設定
  $('#updateBtn').css("display", "inline"); // 更新用のボタンを表示する
  $('#deleteBtn').css("display", "none"); // 削除用のボタンを非表示にする
  $('#taskNameForEdit').css("display", "inline"); // タスク名を入力するための inputbox を表示する
  $('#warningMsg').css("display", "none"); // 削除用の警告メッセージを非表示にする
}

// タスク削除のためのモーダルを表示する
function showDeleteModal(elm) {
  $('#docId').val(elm.getAttribute('value')); // 選択したタスクデータのID を <input type="hidden" id="docId"> に設定
  $('#updateBtn').css("display", "none"); // 更新用のボタンを非表示にする
  $('#deleteBtn').css("display", "inline"); // 削除用のボタンを表示する
  $('#taskNameForEdit').css("display", "none"); // タスク名を入力するための inputbox を非表示にする
  $('#warningMsg').css("display", "inline"); // 削除用の警告メッセージを表示する
}
