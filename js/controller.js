function layInfoTuForm() {
    var username = document.getElementById("tknv").value ;
    var name = document.getElementById("name").value ;
    var email = document.getElementById("email").value ;
    var password = document.getElementById("password").value ;
    var date = document.getElementById("datepicker").value ;
    var salary = document.getElementById("luongCB").value  ;
    var chucvu = document.getElementById("chucvu");
    var chucvuNV = chucvu.options[chucvu.selectedIndex].text;
    var workingtime = document.getElementById("gioLam").value;
    return new NhanVien(username ,name ,email ,password ,date ,salary ,chucvuNV ,workingtime);
}

function showInfoLenForm(sv) {
    document.getElementById("tknv").value = sv.username
    document.getElementById("name").value = sv.name
    document.getElementById("email").value = sv.email
    document.getElementById("password").value = sv.password
    document.getElementById("datepicker").value = sv.date
    document.getElementById("luongCB").value = sv.salary
    document.getElementById("chucvu").value = sv.chucvuNV
    document.getElementById("gioLam").value = sv.workingtime
}

function renderDSNV(dsNV) {
    var contentHTML = ""
    dsNV.forEach(function(item) {
        var contentTr = `
                        <tr>
                            <td>${item.username}</td>
                            <td>${item.name}</td>
                            <td>${item.email}</td>
                            <td>${item.date}</td>
                            <td>${item.chucvuNV}</td>
                            <td>${item.totalSalary()}</td>
                            <td>${item.type()}</td>
                            <td>
                                <button class="btn btn-warning" data-toggle="modal"
                                data-target="#myModal" onclick="suaNV('${item.username}')">Sửa</button>
                                <button class="btn btn-danger" onclick="xoaNV('${item.username}')">Xóa</button>
                            </td>
                        </tr>
        `
        contentHTML += contentTr
    });
    document.getElementById("tableDanhSach").innerHTML = contentHTML
}

function checkRong(value,Err) {
    if ( value.trim().length == 0) {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Nội dung không được để trống`
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
}

function checkNumber(value,Err) {
    const re = /^\d+$/;
    if (re.test(value)) {
        document.getElementById(Err).innerText = ""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Bạn phải nhập số`
        return false
    }
}

function checkLength(min,max,value,Err) {  
    var isValid = checkRong(value,Err);
    if (!isValid) return;
    if (value.trim().length < min || value.trim().length > max) {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Nội dung phải từ ${min} đến ${max} ký tự`
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
}

function checkName(value,Err) { 
    var isValid = checkRong(value,Err);
    if (!isValid) return;
    const re = /^[a-zA-Z ]*$/
    if (re.test(value)) {
        document.getElementById(Err).innerText =""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Nội dung phải là chữ`
        return false
    }
}

function checkEmail(value,Err) { 
    var isValid = checkRong(value,Err);
    if (!isValid) return;
    const re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/
    if (re.test(value)) {
        document.getElementById(Err).innerText =""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Chưa đúng định dạng Email`
        return false
    }
}

function checkPass(value,Err) {
    var isValid = checkRong(value,Err);
    if (!isValid) return; 
    const re =/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,10}/ 
    if (re.test(value)) {
        document.getElementById(Err).innerText =""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Password phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt`
        return false
    }
}

function checkDate(value,Err) {
    var isValid = checkRong(value,Err);
    if (!isValid) return; 
    const re = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
    if (re.test(value)) {
        document.getElementById(Err).innerText =""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Chưa đúng định dạng mm/dd/yyyy`
        return false
    }
}

function checkSalary(value,Err) {
    var isValid = checkRong(value,Err)
                && checkNumber(value,Err)
    if (!isValid) return;   

    if (value <  1000000 || value > 20000000) {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Lương phải từ 1.000.000VNĐ đến 20.000.000VNĐ `
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
}

function checkChucVu(value,Err) {
    if (value === "Chọn chức vụ") {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)`
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
}

function checkWorkingTime(value,Err) {
    var isValid = checkRong(value,Err)
                && checkNumber(value,Err)
    if (!isValid) return;  
    if (value < 80 || value > 200) {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Giờ làm chỉ từ 80 giờ đén 200 giờ`
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
}

function findIndex(username,dsNV) {
    return dsNV.findIndex(function (item) {
        return item.username == username;
    })
}
