const { app, BrowserWindow, Menu } =  require('electron');
const url = require('url');
const path = require('path');

if(process.env.NODE_ENV !== 'production'){
    //reinicia los html cada vez que haya un cambio de html
    require('electron-reload')(__dirname, {
        //refesca la ventana cada vez que haya un cambio de javscript
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow;
let newProductWindow;


//muestra una ventana en cuanto inicia el programa
app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocolo: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed', () => {
        app.quit();
    })
});


//funcion para crear la ventana de agregar producto
function createNewProductWindow(){
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Añade un nuevo producto'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocolo: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', () => {
        newProductWindow = null;
    })
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Nuevo producto',
                accelerator: 'Ctrl+P',
                click(){
                    createNewProductWindow()
                }
            }
        ]
    }
]