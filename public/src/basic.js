let db = firebase.firestore(); // データベースに関する機能の取得

// 保持されている全てのタスクデータを取得し、表示する
function getAll() {
  let collection = db.collection("tasks").orderBy('create_at', 'asc'); // 作成された順にデータを並べてタスクデータをデータベースから取得する
  collection.get().then((querySnapshot) => { // 取得したデータを読み取る
    document.getElementById("list").innerHTML = ""
    num = 0;
    querySnapshot.forEach((doc) => { // 取得したデータそれぞれ1つづつのデータに対して
      // リスト表示するための箇所（ <div id="list"></div> ）にタスクを最下端に追加
      document.getElementById("list").innerHTML += `
      <div>${doc.data()['name']}<button onclick="del('${doc.id}')">削除</button></div>
      `
      num++;
    });
  });
}
getAll(); // 保持されている全てのタスクデータ取得の初期実行（これがないと、画面を開いたときに何も表示されない）

// タスクを追加する
function add() {
  let taskNameForAdd = document.getElementById("taskNameForAdd").value; // inputbox に入力された値を取得する
  if (taskNameForAdd == "") return; // もし、inputbox が空だった場合は関数を終了する

  db.collection("tasks").add({ // データベースにタスクを追加する
      name: taskNameForAdd, // 入力されたタスク名
      create_at: new Date() // 現在時刻
    }).then(function (docRef) { // 成功した場合に実行される箇所
      getAll(); // 保持されている全てのタスクデータを取得し、表示する
      document.getElementById("taskNameForAdd").value = ""; // inputbox に入力された値を空にする
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error adding document: ", error);
    });
}

// タスクを削除する
function del(docId) {
  console.log(docId)
  db.collection("tasks").doc(docId).delete() // $('#docId').val() で削除する対象データのIDを取得し、そのデータに対して削除を行う
    .then(function () { // 成功した場合に実行される箇所
      console.log("Document successfully deleted!");
      getAll(); // 保持されている全てのタスクデータを取得し、表示する
    }).catch(function (error) { // 失敗した場合に実行される箇所
      console.error("Error removing document: ", error);
    });
}
