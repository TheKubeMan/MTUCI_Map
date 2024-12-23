# RU
## Описание

Виртуальная Карта МАИ предоставляет из себя интерактивную модель главного учебного корпуса Московского Авиационного Института, которая имеет информацию о типе аудитории, наличии розеток и досок, а так же их виде (меловая, маркерная, электронная) 
(Информация будет добавляться позже). Помимо этого, Виртуальная Карта имеет возможность нахождения кратчайшего маршрута до любого кабинета. 

## Инструкции по применению

Для работы карты на локальной машине необхадимо установить Python и Flask, после чего достаточно запустить приложение командой ***flask --app app.py run***. Веб-версия приложения запланирована без точной даты релиза.

После запуска перед пользователем предстанет модель четвёртого этажа университета. Зажав левую конпку мыши модель можно будет вращать; 
если перед этим зажать клавишу *Shift* или зажать праву кнопку мыши, то можно будет подвинуть модель в направлении движения мыши.
Если нажать на любую аудиторию (изображены на модели как синие параллелепипеды с чёрной окантовкой), то слева от модели высветится информация о ней. 
Помимо информации об аудитории, пользователю будет представлена поисковая строка, введя в которую название другой аудитории можно будет проложить до неё маршрут от выбранной аудитории.

## Известные проблемы

- При выборе аудитории есть вероятность того, что будет выбрана другая аудитория
- При выборе аудитории и последующей смене отображаемого этажа на другой и обратно, выбранная аудитория перестанет отображаться как выбранная, хоть инфрмация о ней и продолжает отображаться
- Невозможно проложить маршрут от или до аудитории, первая цифра номера которой не совпадает с номером этажа
- Невозможно проложить маршрут от или до лестницы

Подробная информация о каждой проблеме находится в разделе *Issues*

# ENG

## Description

MAI virtual map is an interactive model of the Moscow Aviation Institute with information about he type of each cabinet, outlet blackboard/whiteboard availability and their types (This information will be added later).
Furthermore, the map has a functon to find and draw the shortest route to any cabinet.

## How to use

To use the map on your local machine make sure you have Python and Flask installed. Then, just run the app with ***flask --app app.py run***. A web version of the app is planned without a release date.

After opening the app the user will be greeted by a model of the 4th floor of the University. If you hold down the left mouse button, you can rotate the model. 
If you also hold down the *Shift* key or the right mouse button, you'll be able to move the model in the direction of mouse movements.
After you click on any cabinet (represented as blue cubes with black outlines) a block of information about the cabinet will be shown to the left of the model.
Besides the information, the block will also contain an input field and a button. If you enter a cabinet's name and press the button, the shortest route to that cabinet from the selected one will be drawn on the map.

## Known issues

- When choosing a cabinet there is a chance that another cabinet will be chosen instead
- When choosing a cabinet then changing the displayed floor to a different one and back, the chosen cabinet will be displayed as if it wasn't chosen
- It's impossible to make a route for cabinets, whose number's first digit doesn't match with the floor
- It's impossible to make a rout from or to stairs

For more info on each issue check the *Issue* tab
