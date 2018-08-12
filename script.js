var calculatorController = (function () {

    var data, arr, calcHistory, resltHistory, resetData, historyDelete;
    arr = [];
    calcHistory = [];
    resltHistory = [];

    data = {
        currentNumber: '',
        previousNumber: '',
        operator: '',
        result: 0,
    }

    resetData = function () {
        data.currentNumber = '';
        data.previousNumber = '';
        data.operator = '';
        data.result = 0;
        arr = []
    }

    historyDelete = function () {
        calcHistory = [];
        resltHistory = [];
    }

    return {
        testing: function () {
            console.log(arr)
        },

        addCurrentNumber: function (inputNum) {
            if (inputNum !== '+' && inputNum !== '-' && inputNum !== '*' && inputNum !== '/') {
                data.currentNumber += inputNum
                arr.push(inputNum)
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === '.' && arr[i + 1] === '.') {
                        arr.pop(inputNum)
                    }
                }
            } else {
                data.operator = inputNum;
                arr.push(inputNum)
                if (data.currentNumber !== '') {
                    data.previousNumber = data.currentNumber
                }
                data.currentNumber = ''

                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === '+' && arr[i + 1] === data.operator || arr[i] === '-' && arr[i + 1] === data.operator || arr[i] === '/' && arr[i + 1] === data.operator || arr[i] === '*' && arr[i + 1] === data.operator) {
                        arr.splice(arr.length - 2, 1)

                    }
                }
            }

        },

        getData: function () {
            return {
                currentNumber: data.currentNumber,
                previousNumber: data.previousNumber,
                operator: data.operator,
                result: data.result
            }
        },

        resetData: function () {
            resetData()
        },

        historyresetData: function () {
            historyDelete()
        },

        arrRtn: function () {
            return arrRtn = arr.join('')
        },

        calcHistory: function (save) {
            calcHistory.push(save)
        },

        resultHistory: function (rslthist) {
            resltHistory.push(rslthist)
        },

        calchistoryData: function () {
            return calcHistory
        },

        resultHistoryData: function () {
            return resltHistory
        },

        deleteItem: function () {
            return arr
        }

    };

})();



var UIController = (function () {

    var DOMStrings, i, j;
    i = 0;
    j = 0;

    DOMStrings = {
        digit: '.digit',
        operator: '.operator',
        btn: '.btn',
        disCal: '.display-calculation',
        result: '.result',
        equallbtn: '.equallbtn',
        historyBtn: '.historyBtn',
        deletebtn: '.deletebtn',
        deleteAllbtn: '.deleteAllbtn',
        colorSwitch: '.color-switch',
        topContainer: '.top',
        sameBtn: '.sameBtn'
    }


    display = document.querySelector(DOMStrings.disCal)
    result = document.querySelector(DOMStrings.result)
    topContainer = document.querySelector(DOMStrings.topContainer)

    return {
        testing: function () {
            console.log(arr)
        },

        getDOMstrings: function () {
            return DOMStrings;
        },


        addItem: function (num) {
            display.textContent = num
        },

        deleteItem: function (dlte) {
            display.textContent = dlte
        },

        displayResult: function (reslt) {
            return result.textContent = +eval(reslt).toFixed(2)
        },

        deleteDisplayResult: function () {
            display.textContent = ''
        },

        deleteResult: function () {
            result.textContent = 0
        },

        historyRslt: function (dis, rsl) {
            if (i < rsl.length || j < dis.length) {
                result.textContent = rsl[i]
                display.textContent = dis[j]
                i++
                j++
            }
        },

        colorChange: function (colrBtn) {
            colrBtn.classList.toggle('blue-color-bottom')
            topContainer.classList.toggle('blue-color-bottom')
            document.querySelectorAll(DOMStrings.btn).forEach(function (current) {
                current.classList.toggle('blue-color-bottom')
            })
            document.querySelectorAll(DOMStrings.sameBtn).forEach(function (current) {
                current.classList.toggle('blue-color-bottom')
            })
        },

        testing: function () {

        },

    };

})();




var controller = (function (calcCtrl, UICtrl) {
    var DOM;

    var setupEventListener = function () {
        DOM = UICtrl.getDOMstrings();
        btn = document.querySelectorAll(DOM.btn);
        btn.forEach(function (current) {
            current.addEventListener('click', numberClicked)
        });

        window.addEventListener('keypress', keys)
        window.addEventListener('keydown', keysDown)
        equallbtn = document.querySelector(DOM.equallbtn).addEventListener('click', enter)
        document.querySelector(DOM.historyBtn).addEventListener('click', historyClicked)
        document.querySelector(DOM.deletebtn).addEventListener('click', deleteBtn)
        document.querySelector(DOM.deleteAllbtn).addEventListener('click', deleteAllbtn)
        document.querySelector(DOM.colorSwitch).addEventListener('click', colorSwitch)
    }


    var numberClicked = function () {
        calcPadClick = this.innerText
        addCurNo = calcCtrl.addCurrentNumber(calcPadClick)
        dataReturn = calcCtrl.getData()
        arrRtn = calcCtrl.arrRtn()
        UICtrl.addItem(arrRtn)
        UICtrl.deleteResult()
    }

    var keys = function (e) {
        keyCode = e.keyCode || e.which;
        valueEntered = String.fromCharCode(keyCode);
        if (e.keyCode >= 40 && e.keyCode <= 60) {
            vlueEntr = calcCtrl.addCurrentNumber(valueEntered)
            arrRtn = calcCtrl.arrRtn()
            UICtrl.addItem(arrRtn)
            UICtrl.deleteResult()
        } else if (e.keyCode === 13) {
            arrRtn = calcCtrl.arrRtn()
            resltHistory = UICtrl.displayResult(arrRtn)
            calcCtrl.calcHistory(arrRtn)
            calcCtrl.resultHistory(resltHistory)
            UICtrl.deleteDisplayResult()
            calcCtrl.resetData()
        }
    }

    var keysDown = function (e) {
        if (e.keyCode === 8 ) {
            dlteItm = calcCtrl.deleteItem()
            dlteItm.pop()
            dlteItm = dlteItm.join('')
            UICtrl.deleteItem(dlteItm)
        }

        if (e.keyCode === 16) {
            dis = calcCtrl.calchistoryData()
            rsl = calcCtrl.resultHistoryData()
            UICtrl.historyRslt(dis, rsl)
        }

        if(e.keyCode === 46 && e.ctrlKey === true){
            calcCtrl.resetData()
            // calcCtrl.historyresetData()
            UICtrl.deleteResult()
            UICtrl.deleteDisplayResult()
        }
    }


    var enter = function () {
        arrRtn = calcCtrl.arrRtn()
        resltHistory = UICtrl.displayResult(arrRtn)
        calcCtrl.calcHistory(arrRtn)
        calcCtrl.resultHistory(resltHistory)
        UICtrl.deleteDisplayResult()
        calcCtrl.resetData()
    }

    var historyClicked = function () {
        dis = calcCtrl.calchistoryData()
        rsl = calcCtrl.resultHistoryData()
        UICtrl.historyRslt(dis, rsl)
    }

    var deleteBtn = function () {
        dlteItm = calcCtrl.deleteItem()
        dlteItm.pop()
        dlteItm = dlteItm.join('')
        UICtrl.deleteItem(dlteItm)
    }

    var deleteAllbtn = function () {
        calcCtrl.resetData()
        UICtrl.deleteResult()
        UICtrl.deleteDisplayResult()
    }

    var colorSwitch = function () {
        colorBtn = this
        UICtrl.colorChange(colorBtn)
    }

    return {
        init: function () {
            setupEventListener();
        },

        testing: function () {
            return arrdata
        }
    }

})(calculatorController, UIController);

controller.init();
