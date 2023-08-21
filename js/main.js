var dsNV = []
var jsondata = localStorage.getItem("DSNV");
var boolean = true ;
if (jsondata != null) {
    list = JSON.parse(jsondata);
    dsNV = list.map(function (item) {
        return new NhanVien(item.username ,item.name ,item.email ,item.password ,item.date ,item.salary ,item.chucvuNV ,item.workingtime)
    })
    renderDSNV(dsNV)
}

function checkThemNV() {
    document.getElementById("tknv").disabled = false
    boolean=true
}

function themNV() {
    if(boolean) {
        var nv = layInfoTuForm();
        var isValid =  checkLength(4,6,nv.username,"tbTKNV") 
                        & checkName(nv.name,"tbTen")
                        & checkEmail(nv.email,"tbEmail")
                        & checkPass(nv.password,"tbMatKhau")
                        & checkDate(nv.date,"tbNgay")
                        & checkSalary(nv.salary,"tbLuongCB")
                        & checkChucVu(nv.chucvuNV,"tbChucVu")
                        & checkWorkingTime(nv.workingtime,"tbGiolam")
        if (!isValid) return;
        dsNV.push(nv);
        renderDSNV(dsNV)
        var jsondata = JSON.stringify(dsNV);
        localStorage.setItem("DSNV",jsondata);
    }
}

function xoaNV(username) {
    var index = findIndex(username,dsNV)
    dsNV.splice(index,1)
    renderDSNV(dsNV)
    var jsondata = JSON.stringify(dsNV);
    localStorage.setItem("DSNV",jsondata);
}

function suaNV(username) {
    boolean= false
    var index = findIndex(username,dsNV)
    showInfoLenForm(dsNV[index])
    document.getElementById("tknv").disabled = true
}

function capnhatNV() {
    if(!boolean) {
        var sv = layInfoTuForm();
    var index = findIndex(sv.username,dsNV)
    dsNV[index] = sv
    renderDSNV(dsNV)
    var jsondata = JSON.stringify(dsNV);
    localStorage.setItem("DSNV",jsondata);
    document.getElementById("tknv").disabled = false
    }  
}

function timNV() {
    var dem=0
    var contentHTML="";
    var NVfind = document.getElementById("searchName").value;
    dsNV.forEach(function (item) {
        if (NVfind == item.type()) {
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
            contentHTML+= contentTr
            document.getElementById("tableDanhSach").innerHTML = contentHTML
            boolean=false
        }   else{
            dem++
        }
    }
    )
    if(dem>0 && boolean == true) {
        alert("Không có nhân viên nào thuộc loại này")
    }
}