import sys
import json
import math

with open('data.json', 'r') as f:
    data = json.load(f)

def process_data(str1, str2):
    ft_cab = str1
    sd_cab = str2

    ft_cab = ft_cab[3:]
    sd_cab = sd_cab[3:]

    #Текущая лестница
    stair = str()

    #Предыдущая лестница и текущая лестница
    faststair = str()

    #Ближайшая лестница относительно кабинета
    rollerstair = str()

    #Весь путь от заданного кабинета до нужного
    allpath = str()

    currentfloorUp = int(ft_cab[0])

    currentfloorDown = int(ft_cab[0])

    fast = str()

    #Хранит путь из коридоров
    hallway = ""

    #Хранит лестницу с прошлого этажа
    ultrastair = str()

    #Нахождение ближайшего коридора относительно лесницы при подъеме
    def nearhallway(currentfloorUp, hallway, ultrastair):
        currentfloorUp = currentfloorUp - 1
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        if (curhallway1 < curhallway2):
                hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
        else:
                hallway = "hallway2f" + str(currentfloorUp) + " > hallway1f" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшего коридора относительно лесницы при спуске
    def nearhallwayDown(currentfloorUp, hallway, ultrastair):
        currentfloorUp = currentfloorUp + 1
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        if (curhallway1 < curhallway2):
                hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
        else:
                hallway = "hallway2f" + str(currentfloorUp) + " > hallway1f" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшой лестницы относительно кабинета при подъеме
    def nearhallwayCab(currentfloorUp, hallway):
        currentfloorUp = currentfloorUp
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posY']))**2)

        if (curhallway1 < curhallway2):
                hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
        else:
                hallway = "hallway2f" + str(currentfloorUp) + " > hallway1f" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшой лестницы относительно кабинета при подъеме
    def nearstairplus(curfloor, rollerstair):
        #Счетчик для лестниц
        e = 1
        faststair = ""
        #Буфер для сохранения суммы лестницы
        curstair = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)

        rollerstair = ("stairs" + str(e)) 
        ultrastair = ("stairs" + str(e))

        while(e != 7):
            st = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)
            rs = ("stairs" + str(e)) 
            if (curstair > st):
                curstair = st
                rollerstair = rs
                ultrastair = rs
            e += 1

        faststair = " > " + rollerstair + "f" + str(int(ft_cab[0])) + " > " + rollerstair + "f" + str(int(ft_cab[0]) + 1)
        rollerstair = rollerstair + "f" + str(int(ft_cab[0]) + 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor += 1
        return rollerstair, curfloor, faststair, ultrastair

    #Нахождение ближайшой лестницы относительно кабинета при спуске
    def nearstairplusDown(curfloor, rollerstair):
        #Счетчик для лестниц
        e = 1
        faststair = ""
        #Буфер для сохранения суммы лестницы
        curstair = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)

        rollerstair = ("stairs" + str(e)) 
        ultrastair = ("stairs" + str(e)) 
        
        while(e != 7):
            st = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)
            rs = ("stairs" + str(e)) 
            if (curstair > st):
                curstair = st
                rollerstair = rs
                ultrastair = rs
            e += 1

        faststair = " > " + rollerstair + "f" + str(int(ft_cab[0])) + " > " + rollerstair + "f" + str(int(ft_cab[0]) - 1)
        rollerstair = rollerstair + "f" + str(int(ft_cab[0]) - 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor -= 1
        return rollerstair, curfloor, faststair, ultrastair

    #Нахождение ближайшой лестницы относительно кабинета при подъеме(только для 3-его этажа, так как там только 3 лестницы)
    def nearstairplusfloor3(curfloor, rollerstair, ultrastair):
        #Счетчик для лестниц
        e = 1
        faststair = ""
        #Буфер для сохранения суммы лестницы
        curstair = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)
        
        rollerstair = ("stairs" + str(e)) 
        ultrastair = ("stairs" + str(e)) 

        while(e != 4):
            st = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)
            rs = ("stairs" + str(e)) 
            if (curstair > st):
                curstair = st
                rollerstair = rs
                ultrastair = rs

            e += 1

        faststair = " > " + rollerstair + "f" + str(int(ft_cab[0])) + " > " + rollerstair + "f" + str(int(ft_cab[0]) + 1)
        stair = rollerstair + "f" + str(int(ft_cab[0]) + 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor += 1
        return stair, curfloor, faststair, ultrastair

    #Нахождение ближайшой лестницы относительно кабинета при спуске(только для 3-его этажа, так как там только 3 лестницы)
    def nearstairplusfloor3Down(curfloor, rollerstair, ultrastair):
        #Счетчик для лестниц
        e = 1
        faststair = ""
        #Буфер для сохранения суммы лестницы
        curstair = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)

        rollerstair = ("stairs" + str(e)) 
        ultrastair = ("stairs" + str(e)) 

        while(e != 4):
            st = math.sqrt(((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posX']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(int(ft_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(ft_cab[0]))] ["cab" + ft_cab] ['posY']))**2)
            rs = ("stairs" + str(e)) 
            if (curstair > st):
                curstair = st
                rollerstair = rs
                ultrastair = rs
            e += 1

        faststair = " > " + rollerstair + "f" + str(int(ft_cab[0])) + " > " + rollerstair + "f" + str(int(ft_cab[0]) - 1)
        stair = rollerstair + "f" + str(int(ft_cab[0]) - 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor -= 1
        return stair, curfloor, faststair, ultrastair

    l = 1

    #Нахождение ближайшей лестницы относительно текущей лестницы при подъеме
    def stairstairplus(a, rollerstair, l, stair, allpath):
        while (int(sd_cab[0]) - int(ft_cab[0]) != l):
            r = 1

            curstair = math.sqrt(((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posX']) - (data['floor' + str(a)] [stair] ['posX']))**2 + ((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posY']) - (data['floor' + str(a)] [stair] ['posY']))**2)
            
            rollerstair = ("stairs" + str(r)) 
            ultrastair = ("stairs" + str(r)) 
            
            while(r != 7):
                st = math.sqrt(((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posX']) - (data['floor' + str(a)] [stair] ['posX']))**2 + ((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posY']) - (data['floor' + str(a)] [stair] ['posY']))**2)
                rs = ("stairs" + str(r)) 
                if (curstair > st):
                    curstair = st
                    rollerstair = rs
                    ultrastair = rs
                r += 1
            a += 1
            l += 1
            stair = rollerstair + "f" + str(int(a))
            ultrastair = rollerstair + "f" + str(int(a))
            allpath += " > " + stair

        a += 1
        return rollerstair, a, stair, allpath, ultrastair

    #Нахождение ближайшей лестницы относительно текущей лестницы при спуске
    def stairstairplusDown(a, rollerstair, l, stair, allpath, ultrastair):
        while (int(ft_cab[0]) - int(sd_cab[0]) != l):
            r = 1
            curstair = math.sqrt(((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posX']) - (data['floor' + str(a)] [stair] ['posX']))**2 + ((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posY']) - (data['floor' + str(a)] [stair] ['posY']))**2)
            
            rollerstair = ("stairs" + str(r)) 
            ultrastair = ("stairs" + str(r)) 
            
            while(r != 7):
                st = math.sqrt(((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posX']) - (data['floor' + str(a)] [stair] ['posX']))**2 + ((data['floor' + str(a)] ["stairs" + str(r) + "f" + str(a)] ['posY']) - (data['floor' + str(a)] [stair] ['posY']))**2)
                rs = ("stairs" + str(r)) 
                if (curstair > st):
                    curstair = st
                    rollerstair = rs
                    ultrastair = rs
                r += 1
            a -= 1
            l += 1
            stair = rollerstair + "f" + str(int(a))
            ultrastair = rollerstair + "f" + str(int(a))
            allpath += " > " + stair
        a -= 1
        return rollerstair, a, stair, allpath, ultrastair

    #Переменная для вывода в конце
    final_ft_cab = ft_cab

    #Переменная для вывода в конце
    final_sd_cab = sd_cab

    #Проверка на количество символов в названии кабинета
    if (len(ft_cab) == 4):

        ft_cab = ft_cab[:-1]

    if (len(sd_cab) == 4):

        sd_cab = sd_cab[:-1]

    #Проверка не совпадения этажей заданных кабинетов
    if(ft_cab[0] != sd_cab[0]):
            #Происходит подъем
            if(ft_cab[0] < sd_cab[0]):
                #Проверка на 3-ий этаж
                if (ft_cab[0] == "3"):
                    stair, currentfloorUp, faststair, ultrastair = nearstairplusfloor3(currentfloorUp, rollerstair, ultrastair)
                    allpath = "cab" + final_ft_cab + " > hallway1f3 > "
                    #Проверка наличия дополнительных этажей между кабинетами
                    if (int(sd_cab[0]) - int(ft_cab[0]) == 1):
                        hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + sd_cab
                    else:
                        rollerstair, currentfloorUp, stair, allpath, ultrastair = stairstairplus(currentfloorUp, rollerstair, l, stair, allpath)
                        hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + sd_cab
                else:
                    stair, currentfloorUp, faststair, ultrastair = nearstairplus(currentfloorUp, rollerstair)
                    allpath = "cab" + final_ft_cab + " > "
                    hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                    allpath += hallway + faststair
                    #Проверка наличия дополнительных этажей между кабинетами
                    if (int(sd_cab[0]) - int(ft_cab[0]) == 1):
                        hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + final_sd_cab
                    else:
                        rollerstair, currentfloorUp, stair, allpath, ultrastair = stairstairplus(currentfloorUp, rollerstair, l, stair, allpath)
                        hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + final_sd_cab
            #Спуск
            else:
                    stair, currentfloorUp, faststair, ultrastair = nearstairplusDown(currentfloorUp, rollerstair)
                    allpath = "cab" + final_ft_cab + " > "
                    hallway = nearhallwayDown(currentfloorUp, hallway, ultrastair)
                    allpath += hallway + faststair
                    #Проверка наличия дополнительных этажей между кабинетами
                    if (int(ft_cab[0]) - int(sd_cab[0]) == 1):
                        hallway = nearhallwayDown(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + final_sd_cab
                    else:
                        rollerstair, currentfloorUp, stair, allpath, ultrastair = stairstairplusDown(currentfloorUp, rollerstair, l, stair, allpath, ultrastair)
                        hallway = nearhallwayDown(currentfloorUp, hallway, ultrastair)
                        allpath += " > " + hallway + " > cab" + final_sd_cab
    else:
            allpath += "cab" + final_ft_cab 
            hallway = nearhallwayCab(currentfloorUp, hallway)
            allpath += " > " + hallway + " > cab" + final_sd_cab

    return allpath
    