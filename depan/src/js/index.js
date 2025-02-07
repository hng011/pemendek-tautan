const field_input       = document.getElementById("userinput");
const new_ori_link      = document.getElementById("new-original-link");
const field_mode        = document.getElementById("mode");
const btn_submit        = document.getElementById("btn-submit");
// const btn_copy          = document.getElementById("btn-copy");
const shortened_field   = document.getElementById("shortenedlink");
// const input_box         = document.getElementById("input-box");


let state_mode = 0;
const msg = ["input ur plain link", "input the short code of your link", "put your new original link", "password"];
window.API_URL = null;
field_input.placeholder = msg[0]


const checkmode = () => {
    new_ori_link.classList.add("hidden");

    switch(field_mode.value){
        case "shortener":
            state_mode = 0;
            field_input.value = "";
            field_input.placeholder = msg[0];
            break;
        case "editlink":
            state_mode = 1;
            field_input.value = "";
            field_input.placeholder = msg[1];
            new_ori_link.placeholder = msg[2];
            new_ori_link.classList.remove("hidden"); 
            break;
        case "deletelink":
            state_mode = 2;
            field_input.value = "";
            field_input.placeholder = msg[1];
            break;
        case "all":
            state_mode = 3;
            field_input.value = "";
            field_input.placeholder = msg[3];
            break;
        default:
            alert("woe");
            break;
    }

};


const url = window.API_URL || "http://localhost:8000/";
const ep = ["memendek", "mengubah", "penghapus", "getall"]


// startup
const version = document.getElementById("version");
try {
    fetch(url).then(r => r.json()).then(r => {
        version.innerText = r.version
    });
} catch (err) {
    console.error(err);
}


btn_submit.addEventListener("click", () => {

    switch(state_mode) {
    
        case 0:
            perpendek(field_input.value);
            break;
        case 1:
            editdata(field_input.value, new_ori_link.value);
            break;
        case 2:
            penghilangan(field_input.value);
            break;
        case 3:
            getall(field_input.value);
            break;
        default:
            alert("WOi"); break;
    }

});


const perpendek = async (original_link) => {

    const url_pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;

    if (!(original_link)) {
        alert("Woi");
    } else if (!(url_pattern.test(original_link))) {
        alert("Woi linkny")
    } else {
        let r = await fetch( (url + ep[0]) , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                original_link: original_link
            }),
        });
        
        r = await r.json()

        if (r.status === "success") {
            alert("success yeee");
            shortened_field.innerText = r.msg;
        } else {
            shortened_field.innerText = r.msg + " | " + r.short_link;
        }
    }

};


const editdata = async (short_code, new_ori_link) => {

    if (!(short_code || new_ori_link)) {
        alert("Woi");
    } else {
        let r = await fetch( (url + ep[1]) , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link_code: short_code,
                new_original_link: new_ori_link
            }),
        });
        
        r = await r.json()

        if (r.status === "success") {
            alert("success yeee");
            shortened_field.innerText = r.msg + " | " + r.short_link;
        } else {
            alert(r.msg);
        }
    }

};


const penghilangan = async (short_link) => {

    if (!(short_link)) {
        alert("Woi");
    } else {
        let r = await fetch( (url + ep[2]) , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                link_code: short_link
            }),
        });
        
        r = await r.json()

        if (r.status === "success") {
            alert(r.msg);
            window.location.reload();
        } else {
            alert(r.msg);
        }
    }

};


const getall = async (cred) => {

    let r = await fetch( (url + ep[3]) , {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cred: cred
        }),
    });
    
    r = await r.json()

    if (r.status === "success") {
        alert(r.msg);
        console.log({base_url: r.base_url, content: r.data});
        shortened_field.innerText = "Look at the console"
    } else {
        alert(r.msg);
        window.location.reload();
    }

};