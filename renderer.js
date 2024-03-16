const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
  }
  

  // Below shows how you can get information from preload.js and change the page dynamically

  // const information = document.querySelector('#test')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`


  func()

  