function NhanVien(username ,name ,email ,password ,date ,salary ,chucvuNV ,workingtime) {
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.salary = salary;
    this.chucvuNV = chucvuNV;
    this.workingtime = workingtime;
    this.totalSalary  = function () {
        if (this.chucvuNV == "Sếp") {
            return this.salary*3;
        }   else  if (this.chucvuNV == "Trưởng phòng") {
                return this.salary*2
            }   else {
                return this.salary
            }
    }
    this.type = function () {
        if (this.workingtime < 160 ) {
            return "Nhân viên trung bình"
        }   else if (this.workingtime >= 160 && this.workingtime < 176 ){
                return "Nhân viên khá" 
            }   else if (this.workingtime >= 176 && this.workingtime < 192 ) {
                    return "Nhân viên giỏi"
                }   else {
                        return "Nhân viên xuất sắc"
                    }
    }
}