let connect = io.connect();

connect.on('player_data', function(data)
{
    objectArray = [];
    Object.keys(data).forEach(function(id)
    {
        x = data[id].x;
        y = data[id].y;
        mass = data[id].mass;
        dy = data[id].dy;
        dx = data[id].dx;

        drawEach(x, y, mass, dy, dx);
    })
});

connect.on('other_data', function(data)
{
    xx = data.x;
    yy = data.y;
    masss = data.mass;
    dyy = data.dy;
    dxx = data.dx;

    drawEach(xx, yy, masss, dyy, dxx);
});

connect.on('disconnect', function(data)
{
        x = data.x;
        y = data.y;

        remove(x, y);
});

connect.on('map', function(map)
{
    objectColArray = map;
    console.log(objectColArray);
});

function movement(x, y)
{
    connect.emit('player_possition', [x, y, connect.id]);
    objectArray.forEach(function(element)
    {
       // console.log(element);
    });
}

function keepEmit()
{
    connect.emit('receive_player_possition_update', connect.id);
}

function require_map(width, x1, y1, colSize, canvas_height)
{
    connect.emit('create_map', [width, x1, y1, colSize, canvas_height]);
}

document.addEventListener("keydown", function(evt){
    if(evt.code == "KeyW" || evt.code == "KeyA"
        || evt.code == "KeyS" || evt.code == "KeyD") 
            connect.emit('player_possition_update_keystroke', [evt.code, connect.id]);
});

document.addEventListener("keyup", function(evt){
    connect.emit('player_possition_update_keystroke', [0, connect.id]);
});