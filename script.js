//Учебный набор №2. Три поля

//Задача: Сделать схему универсальной нейронной сети прямого распространения (персептрон, классификация)
//Применить функцию обратного распространения ошибки

//Константа:ВЕКТОР ИНДЕКСОВ
//const netSize = [3,3,1]; //Учебный набор XOR x1 ⊕ x2
const netSize = [3,6,3]; //Учебный набор №2. Три поля
/*Размер нейронной сети: порядковые номера слоев определяются по индексу: [0], [1], [2]...
слой с индексом [0] - входные данные
netSize[l] - число нейронов в слое l
*/

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

//Учебный набор №2. Три поля:
let trainingSet =
[
[[1,4,1],[1,0,0]],
[[1,3,1],[1,0,0]],
[[1,10,2],[1,0,0]],
[[1,1,19],[0,1,0]],[[1,15,12],[0,0,1]],[[1,14,13],[0,0,1]],[[1,13,10],[0,0,1]],[[1,5,12],[0,1,0]],[[1,9,15],[0,1,0]],[[1,2,20],[0,1,0]],[[1,9,3],[1,0,0]],[[1,5,20],[0,1,0]],[[1,11,6],[0,0,1]],[[1,15,7],[0,0,1]],[[1,3,15],[0,1,0]],[[1,8,12],[0,1,0]],[[1,13,6],[0,0,1]],[[1,7,7],[1,0,0]],[[1,1,7],[1,0,0]],[[1,4,14],[0,1,0]],[[1,13,3],[0,0,1]],[[1,5,14],[0,1,0]],[[1,10,4],[1,0,0]],[[1,3,11],[0,1,0]],[[1,10,13],[0,1,0]],[[1,4,13],[0,1,0]],[[1,4,5],[1,0,0]],[[1,12,11],[0,0,1]],[[1,5,16],[0,1,0]],[[1,2,13],[0,1,0]],[[1,13,14],[0,0,1]],[[1,6,17],[0,1,0]],[[1,11,19],[0,0,1]],[[1,11,17],[0,0,1]],[[1,9,10],[1,0,0]],[[1,7,14],[0,1,0]],[[1,12,5],[0,0,1]],[[1,15,1],[0,0,1]],[[1,8,4],[1,0,0]],[[1,3,16],[0,1,0]],[[1,6,5],[1,0,0]],[[1,3,17],[0,1,0]],[[1,3,2],[1,0,0]],[[1,6,11],[0,1,0]],[[1,4,12],[0,1,0]],[[1,13,11],[0,0,1]],[[1,15,8],[0,0,1]],[[1,6,9],[1,0,0]],[[1,7,18],[0,1,0]],[[1,10,9],[1,0,0]],[[1,12,19],[0,0,1]],[[1,2,3],[1,0,0]],[[1,1,2],[1,0,0]],[[1,7,15],[0,1,0]],[[1,11,8],[0,0,1]],[[1,13,13],[0,0,1]],[[1,14,10],[0,0,1]],[[1,5,8],[1,0,0]],[[1,13,9],[0,0,1]],[[1,9,5],[1,0,0]],[[1,4,7],[1,0,0]],[[1,15,4],[0,0,1]],[[1,13,18],[0,0,1]],[[1,11,16],[0,0,1]],[[1,6,3],[1,0,0]],[[1,3,20],[0,1,0]],[[1,12,7],[0,0,1]],[[1,12,16],[0,0,1]],[[1,3,4],[1,0,0]],[[1,15,11],[0,0,1]],[[1,4,16],[0,1,0]],[[1,12,18],[0,0,1]],[[1,11,12],[0,0,1]],[[1,5,11],[0,1,0]],[[1,13,5],[0,0,1]],[[1,2,8],[1,0,0]],[[1,3,9],[1,0,0]],[[1,11,13],[0,0,1]],[[1,4,17],[0,1,0]],[[1,2,19],[0,1,0]],[[1,4,8],[1,0,0]],[[1,14,2],[0,0,1]],[[1,9,8],[1,0,0]],[[1,14,7],[0,0,1]],[[1,2,2],[1,0,0]],[[1,10,7],[1,0,0]],[[1,14,8],[0,0,1]],[[1,15,19],[0,0,1]],[[1,10,19],[0,1,0]],[[1,8,17],[0,1,0]],[[1,8,16],[0,1,0]],[[1,11,11],[0,0,1]],[[1,14,11],[0,0,1]],[[1,5,9],[1,0,0]],[[1,7,8],[1,0,0]],[[1,12,1],[0,0,1]],[[1,5,2],[1,0,0]],[[1,10,12],[0,1,0]],[[1,6,19],[0,1,0]],[[1,9,16],[0,1,0]],[[1,9,6],[1,0,0]],[[1,8,18],[0,1,0]],[[1,15,5],[0,0,1]],[[1,14,15],[0,0,1]],[[1,15,3],[0,0,1]],[[1,15,18],[0,0,1]],[[1,5,15],[0,1,0]],[[1,4,10],[1,0,0]],[[1,2,9],[1,0,0]],[[1,11,20],[0,0,1]],[[1,4,15],[0,1,0]],[[1,14,1],[0,0,1]],[[1,9,4],[1,0,0]],[[1,6,15],[0,1,0]],[[1,12,2],[0,0,1]],[[1,3,5],[1,0,0]],[[1,6,13],[0,1,0]],[[1,8,7],[1,0,0]],[[1,8,1],[1,0,0]],[[1,13,19],[0,0,1]],[[1,1,20],[0,1,0]],[[1,4,18],[0,1,0]],[[1,12,6],[0,0,1]],[[1,14,6],[0,0,1]],[[1,2,4],[1,0,0]],[[1,8,13],[0,1,0]],[[1,1,11],[0,1,0]],[[1,6,18],[0,1,0]],[[1,10,17],[0,1,0]],[[1,3,7],[1,0,0]],[[1,4,11],[0,1,0]],[[1,7,1],[1,0,0]],[[1,5,3],[1,0,0]],[[1,7,16],[0,1,0]],[[1,1,12],[0,1,0]],[[1,9,11],[0,1,0]],[[1,1,13],[0,1,0]],[[1,6,20],[0,1,0]],[[1,11,3],[0,0,1]],[[1,10,14],[0,1,0]],[[1,5,10],[1,0,0]],[[1,11,7],[0,0,1]],[[1,8,14],[0,1,0]],[[1,6,4],[1,0,0]],[[1,4,4],[1,0,0]],[[1,4,19],[0,1,0]],[[1,9,14],[0,1,0]],[[1,15,6],[0,0,1]],[[1,9,18],[0,1,0]],[[1,14,12],[0,0,1]],[[1,11,5],[0,0,1]],[[1,9,7],[1,0,0]],[[1,10,10],[1,0,0]],[[1,15,16],[0,0,1]],[[1,2,10],[1,0,0]],[[1,1,1],[1,0,0]],[[1,15,9],[0,0,1]],[[1,7,17],[0,1,0]],[[1,8,2],[1,0,0]],[[1,10,8],[1,0,0]],[[1,5,6],[1,0,0]],[[1,2,7],[1,0,0]],[[1,10,18],[0,1,0]],[[1,9,9],[1,0,0]],[[1,9,13],[0,1,0]],[[1,8,5],[1,0,0]],[[1,15,2],[0,0,1]],[[1,15,13],[0,0,1]],[[1,5,17],[0,1,0]],[[1,6,12],[0,1,0]],[[1,3,8],[1,0,0]],[[1,9,12],[0,1,0]],[[1,1,6],[1,0,0]],[[1,6,8],[1,0,0]],[[1,5,13],[0,1,0]],[[1,12,15],[0,0,1]],[[1,1,5],[1,0,0]],[[1,7,20],[0,1,0]],[[1,8,15],[0,1,0]],[[1,2,14],[0,1,0]],[[1,7,13],[0,1,0]],[[1,13,2],[0,0,1]],[[1,3,10],[1,0,0]],[[1,14,9],[0,0,1]],[[1,13,7],[0,0,1]],[[1,3,19],[0,1,0]],[[1,8,6],[1,0,0]],[[1,2,6],[1,0,0]],[[1,6,7],[1,0,0]],[[1,2,12],[0,1,0]],[[1,15,14],[0,0,1]],[[1,9,17],[0,1,0]],[[1,14,18],[0,0,1]],[[1,5,19],[0,1,0]],[[1,8,3],[1,0,0]],[[1,7,12],[0,1,0]],[[1,7,9],[1,0,0]],[[1,11,1],[0,0,1]],[[1,15,20],[0,0,1]],[[1,3,14],[0,1,0]],[[1,10,1],[1,0,0]],[[1,4,6],[1,0,0]],[[1,11,15],[0,0,1]],[[1,1,9],[1,0,0]],[[1,1,4],[1,0,0]],[[1,14,20],[0,0,1]],[[1,7,4],[1,0,0]],[[1,14,16],[0,0,1]],[[1,5,4],[1,0,0]],[[1,14,5],[0,0,1]],[[1,3,13],[0,1,0]],[[1,2,16],[0,1,0]],[[1,5,1],[1,0,0]],[[1,1,17],[0,1,0]],[[1,7,11],[0,1,0]],[[1,6,14],[0,1,0]],[[1,9,20],[0,1,0]],[[1,10,11],[0,1,0]],[[1,3,3],[1,0,0]],[[1,13,20],[0,0,1]],[[1,13,1],[0,0,1]],[[1,4,20],[0,1,0]],[[1,8,19],[0,1,0]],[[1,4,3],[1,0,0]],[[1,15,17],[0,0,1]],[[1,12,17],[0,0,1]],[[1,6,6],[1,0,0]],[[1,13,16],[0,0,1]],[[1,10,20],[0,1,0]],[[1,1,8],[1,0,0]],[[1,12,3],[0,0,1]],[[1,11,4],[0,0,1]],[[1,10,5],[1,0,0]],[[1,14,4],[0,0,1]],[[1,2,1],[1,0,0]],[[1,11,18],[0,0,1]],[[1,15,10],[0,0,1]],[[1,1,15],[0,1,0]],[[1,13,8],[0,0,1]],[[1,14,17],[0,0,1]],[[1,3,18],[0,1,0]],[[1,2,5],[1,0,0]],[[1,12,10],[0,0,1]],[[1,13,17],[0,0,1]],[[1,2,17],[0,1,0]],[[1,1,14],[0,1,0]],[[1,7,5],[1,0,0]],[[1,9,19],[0,1,0]],[[1,11,10],[0,0,1]],[[1,9,2],[1,0,0]],[[1,9,1],[1,0,0]],[[1,14,19],[0,0,1]],[[1,10,15],[0,1,0]],[[1,12,9],[0,0,1]],[[1,15,15],[0,0,1]],[[1,2,15],[0,1,0]],[[1,6,2],[1,0,0]],[[1,2,18],[0,1,0]],[[1,11,2],[0,0,1]],[[1,14,14],[0,0,1]],[[1,12,4],[0,0,1]],[[1,7,2],[1,0,0]],[[1,5,18],[0,1,0]],[[1,13,12],[0,0,1]],[[1,8,8],[1,0,0]],[[1,1,10],[1,0,0]],[[1,10,3],[1,0,0]],[[1,4,9],[1,0,0]],[[1,11,9],[0,0,1]],[[1,12,13],[0,0,1]],[[1,1,16],[0,1,0]],[[1,1,3],[1,0,0]],[[1,13,15],[0,0,1]],[[1,7,10],[1,0,0]],[[1,2,11],[0,1,0]],[[1,8,11],[0,1,0]],[[1,8,9],[1,0,0]],[[1,6,1],[1,0,0]],[[1,10,16],[0,1,0]],[[1,10,6],[1,0,0]],[[1,1,18],[0,1,0]],[[1,5,5],[1,0,0]],[[1,3,12],[0,1,0]],[[1,6,16],[0,1,0]],[[1,12,20],[0,0,1]],[[1,12,8],[0,0,1]],[[1,5,7],[1,0,0]],[[1,4,2],[1,0,0]],[[1,8,20],[0,1,0]],[[1,7,19],[0,1,0]],[[1,6,10],[1,0,0]],[[1,12,12],[0,0,1]],[[1,13,4],[0,0,1]],[[1,7,3],[1,0,0]],[[1,7,6],[1,0,0]],[[1,3,6],[1,0,0]],[[1,12,14],[0,0,1]],[[1,14,3],[0,0,1]],[[1,8,10],[1,0,0]],[[1,11,14],[0,0,1]]
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
