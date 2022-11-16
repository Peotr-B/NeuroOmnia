//Учебный Набор №3. Вертикальные и горизонтальные линии

//Задача: Сделать схему универсальной нейронной сети прямого распространения (персептрон, классификация)
//Применить функцию обратного распространения ошибки

//Константа:ВЕКТОР ИНДЕКСОВ
//const netSize = [3,3,1]; //Учебный набор XOR x1 ⊕ x2
//const netSize = [3,6,3]; //Учебный набор №2. Три поля
const netSize = [10,9,2]; //УУчебный Набор №3. Вертикальные и горизонтальные линии
/*Размер нейронной сети: порядковые номера слоев определяются по индексу: [0], [1], [2]...
слой с индексом [0] - входные данные
netSize[l] - число нейронов в слое l
*/
/*
В этом примере предлагается самому выбрать количество скрытых слоёв.
Если поставить число скрытых слоёв "3", то при 10000 эпох ошибка = примерно 5.
Если поставить число слоёв "9", то при 10000 эпох ошибка = 0!
/*

//Показать структуру сети
function showStructureOfNet () {
  for (let l=0; l<netSize.length; l++) {
    console.log(`Слой [${l}],${(l==0)?`входные данные;`:``} элементы:`);
    for(let i=0; i<netSize[l]; i++ ) {
      console.log(`N [${l}][${i}]${(l!=(netSize.length-1)&&i==0)?`=1, нейрон смещения(bias)`:``}`);
    }
  }
    console.log(`-----------------------------------
Всего слоев - ${netSize.length}.`);
}

/////////////////////////УЧЕБНЫЙ НАБОР/////////////////////////////////////
/*Учебный набор должен включать попарные массивы:
1) ВХОДНЫЕ ДАННЫЕ: число элементов соответствует [0]-му слою, элемент[0]=1
2) ПРАВИЛЬНЫЕ ОТВЕТЫ: число элементов соответствует последнему слою
*/

//Учебный Набор №3. Вертикальные и горизонтальные линии:
let trainingSet =
[
[[1,1,1,1,0,0,0,0,0,0],[1,0]],
[[1,0,0,0,1,1,1,0,0,0],[1,0]],
[[1,0,0,0,0,0,0,1,1,1],[1,0]],
[[1,1,0,0,1,0,0,1,0,0],[0,1]],
[[1,0,1,0,0,1,0,0,1,0],[0,1]],[[1,0,0,1,0,0,1,0,0,1],[0,1]],[[1,0,0,1,0,0,1,1,1,1],[1,1]],[[1,1,0,0,1,0,0,1,1,1],[1,1]],[[1,1,1,1,1,0,0,1,0,0],[1,1]],[[1,1,1,1,0,0,1,0,0,1],[1,1]],[[1,0,1,0,1,1,1,0,1,0],[1,1]],[[1,0,0,1,1,1,1,0,0,1],[1,1]],[[1,1,0,0,1,1,1,1,0,0],[1,1]],[[1,1,1,1,0,1,0,0,1,0],[1,1]],[[1,1,1,1,0,1,0,0,1,0],[1,1]],[[1,1,1,1,0,0,0,1,1,1],[1,0]],[[1,1,0,1,1,0,1,1,0,1],[0,1]],[[1,0,0,0,1,1,1,1,1,1],[1,0]],[[1,1,1,1,1,1,1,0,0,0],[1,0]],[[1,1,1,0,1,1,0,1,1,0],[0,1]],[[1,0,1,1,0,1,1,0,1,1],[0,1]],[[1,1,1,1,1,1,1,1,1,1],[1,1]],[[1,1,1,1,0,1,0,1,1,1],[1,1]],[[1,1,0,1,1,1,1,1,0,1],[1,1]],[[1,0,0,0,0,0,0,0,0,0],[0,0]]
]

let fullCheckSet = trainingSet

//////////////////////////ПРОВЕРКА ПРАВИЛЬНОСТИ ВНЕСЕННЫХ ДАННЫХ//////////////
function startCheck() {
  if
  (netSize[0]!=trainingSet[0][0].length   ||    netSize[netSize.length-1]!=trainingSet[0][1].length)
    {
      alert('Проверьте число элементов в учебной выборке trainingSet ')
    }
      else if
      (netSize[0]!=fullCheckSet[0][0].length   ||   netSize[netSize.length-1]!=fullCheckSet[0][1].length)
      {
          alert('Проверьте число элементов в проверочной выборке fullCheckSet ')
          }
    };

startCheck();



/////////////////////////////////////ИНИЦИАЛИЗАЦИЯ ВЕСОВ////////////////////////
let w = [];

/*Инициализация трехмерной матрицы весов
Адрес каждого веса между нейроном1 и нейроном2 [l][i][b],
где l - слой нейрона2, i - индекс нейрона2, b - индекс нейрона1*/
function createArray_w (){
  w[0]=NaN;
for (let l=1; l<netSize.length; l++) { //перебираем слои
w[l] = []
for (let i=0; i<netSize[l]; i++) { //перебираем нейроны каждого слоя
  w[l][i] = [];
  for (let b=0; b<netSize[(l-1)]; b++) { //перебираем связи каждого нейрона

if ((l!=netSize.length-1)&&i==0) {
  w[l][i][b] = NaN}
else {w[l][i][b] = Math.random()} //Math.random()-0.5
}}}}


createArray_w();




/////////////////////////////////////////////////////////////////////////
/*Создаем массив данных N, который сохраняет значения всех рассчитанных нейронов
Сначала он пустой, но после каждого рассчитанного примера,
 будут сохранены последние значения, включая входные данные*/
 let N=[];

      function createArray_N () {
      for (let l=0; l<netSize.length; l++) { //перебираем слои
        N[l] = [];
        }
      }

createArray_N ()

//Так создавать массив нельзя, потом глючит и заполняет элементы не по одному а сразу все
// let N = new Array(netSize.length);
// N.fill([]);


/////////////////////////////////////////////////////////////////////////////////
//Создаем массив данных Error, который сохраняет значения ошибок для всех рассчитанных нейронов
//Сначала он пустой, но после каждого рассчитанного примера будут оставаться все значения, первый слой - NaN
let error=[];

function createArray_Error (){
  error[0]=NaN;
for (let l=1; l<netSize.length; l++) { //перебираем слои
error[l] = []
 }
}

createArray_Error();


////////////////////////////ОТЧЕТ СЕТИ//////////////////////////////////////////

let report = [['число эпох','ошибка сети']];//report.push([1000,0.5])

let numberOfEpochs = 0;//накопительная переменная
let netError;

// function showReport() {
//   report.push([1000,0.5])
//   google.charts.setOnLoadCallback(drawChart);
// }

google.charts.load('current', {'packages':['corechart']});
     //google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(report);

        var options = {
          title: 'Отчет сети',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }


/////////////////////////////////ОТВЕТ СЕТИ/////////////////////////////////////

      function answer(x=trainingSet[0][0]) {
        //в качестве параметра по умолчанию передаем первую часть первого примера из учебного набора
        //заполняем нулевой слой значений массива N входными данными
        N[0]=x;

        for (let l = 1; l < netSize.length; l++) {// перебираем слои, начиная с 1
          for (let i = 0; i < netSize[l]; i++) {//перебираем нейроны

              let summator = 0;

                for (let b = 0; b < netSize[l-1]; b++) {

                    summator+=N[l-1][b]*w[l][i][b]
                }

              N[l][i]= 1 / (1 + Math.exp( -summator));

              //заменяем значения нейронов смещения на 1
                if (l!= netSize.length-1)

                { N[l][0] = 1 }

                //Раскомментировать строчку ниже, если требуется отчет: "Значение каждого нейрона"
                //console.log(`N[${l}][${i}]=${N[l][i]}`);
              }
            }
          }


//////////////////////ПОЛНАЯ ПРОВЕРКА/////////////////

      function checkAll(set=fullCheckSet) {
      //по умолчанию в качестве параметра передается проверочная выборка, но можно вручную подставить и trainingSet
      netError = 0;

      for
        (let sample = 0; sample < fullCheckSet.length; sample++) {//перебираем примеры проверочной выборки

          answer(set[sample][0]);

            console.log(`
----------------------индекс примера: ${sample}
            вход:${set[sample][0]}, целевой ответ:${set[sample][1]},
            ответ сети:${N[netSize.length-1]}`);

            //определяем, правильный ли ответ
            //для этого перебираем правильные ответы и ответы сети. Оба показателя - это массивы

            for (let i = 0; i < set[sample][1].length; i++) {//

              if ((set[sample][1][i]-Math.round(N[netSize.length-1][i]))!=0)
                {
                  netError+=Math.abs(set[sample][1][i]-N[netSize.length-1][i]);

                        console.log(`[${i}] ошибка: ${set[sample][1][i]-N[netSize.length-1][i]}`);
                }

                  else {console.log(`[${i}] правильно`)};
              }
            }
            console.log(`------------------------------------------------------------
              ошибка сети: ${netError}`);

              // показать отчет по ошибке сети (если значение ошибки до обучения в таблице уже заполнено, то ничего не делать )

              // if (report[1]) {
              //
              // }
              //
              // else {
                report.push([numberOfEpochs,netError]) //добавить значение в таблицу

                google.charts.setOnLoadCallback(drawChart); //показать график ошибки
            //  }
            }





//////////////Вспомогательная функции для обучения ////////////////////////////
/////////////////////////Ошибка сети/////////////////////////////////////////


      function calculateError (y=trainingSet[0][1]) { //запускать после answer (x)

        //считаем ошибки последнего слоя (от скрытых слоев отличается формулой)
        for (let l = netSize.length-1, i=0; i < netSize[l]; i++) {
          error [l][i] =(y[i]-N[l][i])*N[l][i]*(1-N[l][i]);
          //Раскомментировать строчку ниже, если требуется отчет: "Значение ошибки каждого нейрона последнего слоя"
          //console.log(`error[${l}][${i}]=${error[l][i]}`);
        }


      /*считаем ошибки предпоследнего скрытого слоя
      (от других скрытых слоев данный слой отличается тем, что учитывает все ошибки,
      входящие с последнего слоя, в последнем слое нет нейрона смещения, для которого ошибка не рассчитывается
      */

        for (let l = netSize.length-2, i = 1; i < netSize[l]; i++) {
          let summator = 0;
            for (let b = 0; b < netSize[l+1]; b++) {
            summator+=error[l+1][b]*w[l+1][b][i];
          }
          error[l][i] = summator*N[l][i]*(1-N[l][i]);
          //Раскомментировать строчку ниже, если требуется отчет: "Значение ошибки каждого нейрона скрытого слоя"
          //console.log(`error[${l}][${i}]=${error[l][i]}`);
        }


        //считаем ошибку остальных скрытых слоев
        for (let l = netSize.length-3; l > 0; l--) {
          for (let i = 1; i < netSize[l]; i++) {
            let summator = 0;
              for (let b = 1; b < netSize[l+1]; b++) {
              summator+=error[l+1][b]*w[l+1][b][i];
            }
            error[l][i] = summator*N[l][i]*(1-N[l][i]);
            //Раскомментировать строчку ниже, если требуется отчет: "Значение ошибки каждого нейрона скрытого слоя"
            //console.log(`error[${l}][${i}]=${error[l][i]}`);
          }
          }

      }



///////////////////////ОБУЧЕНИЕ СЕТИ ////////////////////////////////////////



      function train( epoch = 1, t = 0.3 ) {
        for (let e = 0; e < epoch; e++) { //перебираем эпохи
          for (let sample = 0; sample < trainingSet.length; sample++) {//перебираем примеры обучающей выборки
            answer (trainingSet[sample][0]);
            calculateError(trainingSet[sample][1]);
            ////////////////////////КОРРЕКТИРОВКА ВЕСОВ//////////////////////
            for (let l = 1; l < netSize.length; l++) { //перебираем слои
              for (let i = 0; i < netSize[l]; i++) { //перебираем нейроны в слое
                for (let b = 0; b < netSize[l-1]; b++) { //перебираем связи с нейронами предыдущего слоя
                  //NaN игнорируем и тоже перебираем, потому что NaN останется NaN
                  w[l][i][b]+=t*error[l][i]*N[l-1][b]
                  }

                  }
                }
              }

            }
            numberOfEpochs+=epoch
            checkAll();
          }
