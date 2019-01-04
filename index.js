if(localStorage.getItem("data_encash") == undefined) {
    localStorage.setItem("data_encash", JSON.stringify({
        assets: {}
    }));
}

var data = JSON.parse(localStorage.getItem("data_encash"));
const element = document.getElementById('content');
var _months_ = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
var _date_ = new Date();

var React = {
    createElement: function (tag, attrs, children) {
        var e = document.createElement(tag);

        for (var name in attrs) {
            if (name && attrs.hasOwnProperty(name)) {
                var v = attrs[name];
                if (v === true) {
                    e.setAttribute(name, name);
                } else if (v !== false && v != null) {
                    e.setAttribute(name, v.toString());
                }
            }
        }

        for (var i = 2; i < arguments.length; i++) {
            var child = arguments[i];
            if(child != null) {
                e.appendChild(child.nodeType == null ? document.createTextNode(child.toString()) : child);
            }             
        }

        return e;
    }
}

function checkInput(input) {
    return input != "" && input != null && input != undefined;
}

function calcCurrentDebt(asset) {
    return (parseFloat(asset["debt"]) - ((_date_.getMonth() - asset["start_month"] + 1) * parseInt(asset["monthly_payment"])));
}

function navAction() {
    var asset = prompt("asset:", "");
    if(checkInput(asset)) {
        var debt = prompt("debt:", "");
        if(checkInput(debt)) {
            var monthlyPayment = prompt("monthly payment:", "");
            if(checkInput(monthlyPayment)) {
                var obj = {};
                obj["asset"] = asset;
                obj["debt"] = debt.replace(",", ".");
                obj["monthly_payment"] = monthlyPayment.replace(",", ".");
                obj["start_month"] = _date_.getMonth();
                obj["start_year"] = _date_.getFullYear();

                console.log(obj, asset, data.assets);

                data.assets[asset] = obj;
                document.getElementById('content').appendChild(React.createElement('tr',{},React.createElement('td',{style: "border-bottom: 1px solid rgb(247, 247, 248);"},asset + " - " + _months_[_date_.getMonth()]),React.createElement('td',{style: "border-bottom: 1px solid rgb(247, 247, 248);"}, calcCurrentDebt(obj) + '€')));
                localStorage.setItem("data_encash", JSON.stringify(data));
            }         
        }
    }
}

for (var key in data.assets) {
    document.getElementById('content').appendChild(React.createElement('tr',{},React.createElement('td',{style: "border-bottom: 1px solid rgb(247, 247, 248);"},data.assets[key].asset + " - " + _months_[_date_.getMonth()]),React.createElement('td',{style: "border-bottom: 1px solid rgb(247, 247, 248);"}, calcCurrentDebt(data.assets[key]) + '€')));
}