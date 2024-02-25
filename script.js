const units = [
    "kmph",
    "mph"
];

function navigate(tab) {
    if (tab == "credits") {
        document.getElementById("creditsI").style.display = "block";
        document.getElementById("ranksI").style.display = "none";

        document.getElementById("credits").className = "navbarTabA";
        document.getElementById("ranks").className = "navbarTab";
    } else if (tab == "ranks") {
        document.getElementById("creditsI").style.display = "none";
        document.getElementById("ranksI").style.display = "block";

        document.getElementById("credits").className = "navbarTab";
        document.getElementById("ranks").className = "navbarTabA";
    }
}

function calculate(form) {
    if (form == "cI") {
        let cIend = parseInt(document.getElementById('cIend').value, 10);
        let cIstart = parseInt(document.getElementById('cIstart').value, 10);
        let cIspeed = parseInt(document.getElementById('cIspeed').value, 10);
        let cIsalary = parseInt(document.getElementById('cIsalary').value, 10);
        let cIunit = document.getElementById("cIunit").value.replace("<", "&lt;").replace(">", "&gt;");

    
        if (isNaN(cIend + cIstart)) {
            document.getElementById("cIresult").innerText = "Your Credit goal or Credit staring amount is invalid. Make sure they are all filled and only contain numbers. (Eg. No decimals or commas.)"
            return 1;
        } else if (cIstart >= cIend) {
            document.getElementById("cIresult").innerText = "You entered a Credit goal that you have already surpassed. If you really mean to achieve fewer Credits, I will humbly accept donations."
            return 1;
        } else if (!units.includes(cIunit)) {
            document.getElementById("cIresult").innerText = "The unit of measure selected is invalid. (Were you snooping around in the dev tools?)"
            return 1;
        }

        var cIcreditsRemaining = cIend - cIstart;
        var cIhoursRemaining = cIcreditsRemaining / cIsalary * 4 / 3600;   
        document.getElementById("cIresult").innerHTML = "You are <b>" + cIcreditsRemaining.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> Credits away from your goal of <b>" + cIend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b>."; 
        
        if (isNaN(cIspeed + cIsalary)) {
            document.getElementById("cIresult").innerHTML += "<br>Remaining mileage and laps can only be calculated if both top speed and Credits per payment are provided.";
        } else {
            if (cIunit == "kmph") {
                var cIadjustedSpeed = cIspeed / 1.609;
            } else {
                var cIadjustedSpeed = cIspeed;
            }
            var cImilesRemaining = cIhoursRemaining * cIadjustedSpeed;
            var cIlapsRemaining = cImilesRemaining / 12;
            document.getElementById("cIresult").innerHTML += "<br>Travelling at <b>" + cIspeed + "</b>" + cIunit + ", it will take <b>" + cIhoursRemaining.toFixed(2) + "</b>ish hours of driving.<br>For you, that equates to around <b>" + Math.round(cImilesRemaining).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> miles, or <b>" + Math.round(cIlapsRemaining).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> one-way trips on Westover's Interstate 76."
        }
        return;

    } else if (form == "rI") {
        let rIend = parseInt(document.getElementById('rIend').value, 10);
        let rIstart = parseInt(document.getElementById('rIstart').value, 10);
        let rIspeed = parseInt(document.getElementById('rIspeed').value, 10);
        let rIextra = parseInt(document.getElementById('rIextra').value, 10);
        let rIsalary = parseInt(document.getElementById('rIsalary').value, 10);
        let rIunit = document.getElementById("rIunit").value.replace("<", "&lt;").replace(">", "&gt;");

        if (isNaN(rIend + rIstart)) {
            document.getElementById("rIresult").innerText = "Your Rank goal or current Rank is invalid. Make sure they are all filled and only contain numbers. (Eg. No decimals or commas.)"
            return 1;
        } else if (rIstart >= rIend) {
            document.getElementById("rIresult").innerText = "You entered a Rank goal that you have already surpassed. There is no going back. Accept this reality."
            return 1;
        } else if (!units.includes(rIunit)) {
            document.getElementById("rIresult").innerText = "The unit of measure selected is invalid. (Were you snooping around in the dev tools?)"
            return 1;
        }

        var rIXPRemaining = 0;

        if (rIextra == "" || isNaN(rIextra)) {
            rIextra = 0;
            rIXPRemaining += Math.floor(0.1 * (rIstart ** 3)) + 1000;
        } else {
            rIXPRemaining += rIextra;
        }
        for (let i = rIstart + 1; i < rIend; i++) {
            rIXPRemaining += Math.floor(0.1 * (i ** 3)) + 1000;
        }
        
        document.getElementById("rIresult").innerHTML = "You are <b>" + rIXPRemaining.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> XP away from Rank <b>" + rIend.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b>."; 

        if (isNaN(rIspeed + rIsalary)) {
            document.getElementById("rIresult").innerHTML += "<br>Remaining hours, mileage, and laps can only be calculated if both top speed and XP per mile are provided.";
        } else {
            if (rIunit == "kmph") {
                var rIadjustedSpeed = rIspeed / 1.609;
            } else {
                var rIadjustedSpeed = rIspeed;
            }
            var rImilesRemaining = rIXPRemaining / rIsalary;
            var rIhoursRemaining = rImilesRemaining / rIspeed;
            var rIlapsRemaining = rImilesRemaining / 12;
            document.getElementById("rIresult").innerHTML += "<br>Travelling at <b>" + rIspeed + "</b>" + rIunit + ", it will take <b>" + rIhoursRemaining.toFixed(2) + "</b>ish hours of driving.<br>For you, that equates to around <b>" + Math.round(rImilesRemaining).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> miles, or <b>" + Math.round(rIlapsRemaining).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "</b> one-way trips on Westover's Interstate 76."
        }
        return;

    } 
}