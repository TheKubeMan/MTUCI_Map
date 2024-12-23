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
                hallway = "hallway1f" + str(currentfloorUp)
        else:
                hallway = "hallway2f" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшего коридора относительно лесницы при спуске
    def nearhallwayDown(currentfloorUp, hallway, ultrastair):
        currentfloorUp = currentfloorUp + 1
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        if (curhallway1 < curhallway2):
                hallway = "hallway1f" + str(currentfloorUp)
        else:
                hallway = "hallway2f" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшой лестницы относительно кабинета
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

    #Нахождение ближайшего коридора относительно кабинета на одном этаже
    def nearhallwayOne(currentfloorUp, hallway):
        currentfloorUp = currentfloorUp
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] ["cab" + ft_cab] ['posY']))**2)

        if (curhallway1 < curhallway2):
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)

                if (curstair < hCross):
                    hallway = hallway
                else:
                    hallway = " > hCrossf" + str(currentfloorUp)
        else:
                #hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)

                if (curstair < hCross):
                    hallway = hallway
                else:
                    hallway = " > hCrossf" + str(currentfloorUp)
        return hallway

    #Нахождение ближайшего коридора относительно лестницы при подъеме
    def nearhallwayPlusCab(currentfloorUp, hallway, ultrastair):
        currentfloorUp = currentfloorUp - 1
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        if (curhallway1 < curhallway2):
                #hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1
                faststair = ""
                #Буфер для сохранения суммы лестницы
                # curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(sd_cab[0]))] ['posX']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']))**2)

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)

                ultrastair = ("stairs" + str(e))

                if (curstair < hCross):
                    hallway = " > hallway1f" + str(currentfloorUp + 1)
                else:
                    hallway = " > hallway1f" + str(currentfloorUp + 1) + " > hCrossf" + str(currentfloorUp + 1)
        else:
                #hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1
                faststair = ""
                #Буфер для сохранения суммы лестницы
                # curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(sd_cab[0]))] ['posX']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']))**2)

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)

                ultrastair = ("stairs" + str(e))

                if (curstair < hCross):
                    hallway = " > hallway2f" + str(currentfloorUp + 1)
                else:
                    hallway = " > hallway2f" + str(currentfloorUp + 1) + " > hCrossf" + str(currentfloorUp + 1)
        return hallway

    #Нахождение ближайшего коридора относительно лестницы при подъеме
    def nearhallwayPlusCabDown(currentfloorUp, hallway, ultrastair):
        currentfloorUp = currentfloorUp + 1
        hallway = ""

        curhallway1 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        curhallway2 = math.sqrt(((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']) - (data['floor' + str(currentfloorUp)] [ultrastair] ['posY']))**2)

        if (curhallway1 < curhallway2):
                #hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1
                faststair = ""
                #Буфер для сохранения суммы лестницы
                # curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(sd_cab[0]))] ['posX']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']))**2)

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway1f" + str(currentfloorUp)] ['posY']))**2)

                ultrastair = ("stairs" + str(e))

                if (curstair < hCross):
                    hallway = " > hallway1f" + str(currentfloorUp - 1)
                else:
                    hallway = " > hallway1f" + str(currentfloorUp - 1) + " > hCrossf" + str(currentfloorUp - 1)
        else:
                #hallway = "hallway1f" + str(currentfloorUp) + " > hallway2f" + str(currentfloorUp)
                hCross = math.sqrt(((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(currentfloorUp)] ["hCrossf" + str(currentfloorUp) + "Calc"] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)
                #Счетчик для лестниц
                e = 1
                faststair = ""
                #Буфер для сохранения суммы лестницы
                # curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(sd_cab[0]))] ['posX']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["stairs" + str(e) + "f" + str(int(ft_cab[0]))] ['posY']) - (data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']))**2)

                curstair = math.sqrt(((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posX']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posX']))**2 + ((data['floor' + str(int(sd_cab[0]))] ["cab" + sd_cab] ['posY']) - (data['floor' + str(currentfloorUp)] ["hallway2f" + str(currentfloorUp)] ['posY']))**2)

                ultrastair = ("stairs" + str(e))

                if (curstair < hCross):
                    hallway = " > hallway2f" + str(currentfloorUp - 1)
                else:
                    hallway = " > hallway2f" + str(currentfloorUp - 1) + " > hCrossf" + str(currentfloorUp - 1)
        return hallway

    #Нахождение ближайшой лестницы относительно кабинета при подъеме
    def nearstairplus(curfloor, rollerstair):
        #Счетчик для лестниц
        e = 1
        #Номер ближайшей лестницы
        k = str(e)
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
                k = str(e)
            e += 1

        if(int(sd_cab[0]) - int(ft_cab[0]) == 1):
            faststair = " > hSt" + k + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0])) + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0]) + 1) + "Entry" + " > hSt" + str(k) + "Entry"
        else:
            faststair = " > hSt" + k + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0])) + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0]) + 1) + "Entry"
        rollerstair = rollerstair + "f" + str(int(ft_cab[0]) + 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor += 1
        return rollerstair, curfloor, faststair, ultrastair

    #Нахождение ближайшой лестницы относительно кабинета при спуске
    def nearstairplusDown(curfloor, rollerstair):
        #Счетчик для лестниц
        e = 1

        k = str(e)

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
                k = str(e)
            e += 1

        if(int(ft_cab[0]) - int(sd_cab[0]) == 1):
            faststair = " > hSt" + k + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0])) + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0]) - 1) + "Entry" + " > hSt" + str(k) + "Entry"
        else:
            faststair = " > hSt" + k + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0])) + "Entry" + " > " + rollerstair + "f" + str(int(ft_cab[0]) - 1) + "Entry"
        rollerstair = rollerstair + "f" + str(int(ft_cab[0]) - 1)
        ultrastair = ultrastair + "f" + str(int(ft_cab[0]))
        curfloor -= 1
        return rollerstair, curfloor, faststair, ultrastair

    l = 1

    #Нахождение ближайшей лестницы относительно текущей лестницы при подъеме
    def stairstairplus(a, rollerstair, l, stair, allpath):
        while (int(sd_cab[0]) - int(ft_cab[0]) != l):
            r = 1
            k = str(r)

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
                    k = str(r)
                r += 1
            a += 1
            l += 1
            stair = rollerstair + "f" + str(int(a))
            ultrastair = rollerstair + "f" + str(int(a))
            allpath += " > " + stair + "Entry"
        a += 1
        microstair = "hSt" + str(int(k)) + "Entry"
        allpath += " > " + microstair
        return rollerstair, a, stair, allpath, ultrastair

    #Нахождение ближайшей лестницы относительно текущей лестницы при спуске
    def stairstairplusDown(a, rollerstair, l, stair, allpath, ultrastair):
        while (int(ft_cab[0]) - int(sd_cab[0]) != l):
            r = 1
            k= str(r)
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
                    k = str(r)
                r += 1
            a -= 1
            l += 1
            stair = rollerstair + "f" + str(int(a))
            ultrastair = rollerstair + "f" + str(int(a))
            allpath += " > " + stair + "Entry"
        a -= 1
        microstair = "hSt" + str(int(k)) + "Entry"
        allpath += " > " + microstair
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
                stair, currentfloorUp, faststair, ultrastair = nearstairplus(currentfloorUp, rollerstair)
                allpath = "cab" + final_ft_cab + "Entry > h" + final_ft_cab + "Entry" 
                hallway = nearhallway(currentfloorUp, hallway, ultrastair)
                allpath += faststair
                #Проверка наличия дополнительных этажей между кабинетами
                if (int(sd_cab[0]) - int(ft_cab[0]) == 1):
                    hallway = nearhallwayPlusCab(currentfloorUp, hallway, ultrastair)
                    allpath += hallway + " > h" + final_sd_cab + "Entry" + " > cab" + final_sd_cab + "Entry"
                else:
                    rollerstair, currentfloorUp, stair, allpath, ultrastair = stairstairplus(currentfloorUp, rollerstair, l, stair, allpath)
                    hallway = nearhallwayPlusCab(currentfloorUp, hallway, ultrastair)
                    allpath += hallway + " > h" + final_sd_cab + "Entry" + " > cab" + final_sd_cab + "Entry"
            #Спуск
            else:
                    stair, currentfloorUp, faststair, ultrastair = nearstairplusDown(currentfloorUp, rollerstair)
                    allpath = "cab" + final_ft_cab + "Entry > h" + final_ft_cab + "Entry" 
                    hallway = nearhallwayDown(currentfloorUp, hallway, ultrastair)
                    allpath += faststair
                    #Проверка наличия дополнительных этажей между кабинетами
                    if (int(ft_cab[0]) - int(sd_cab[0]) == 1):
                        hallway = nearhallwayPlusCabDown(currentfloorUp, hallway, ultrastair)
                        allpath += hallway + " > h" + final_sd_cab + "Entry" + " > cab" + final_sd_cab + "Entry"
                    else:
                        rollerstair, currentfloorUp, stair, allpath, ultrastair = stairstairplusDown(currentfloorUp, rollerstair, l, stair, allpath, ultrastair)
                        hallway = nearhallwayPlusCabDown(currentfloorUp, hallway, ultrastair)
                        allpath += hallway + " > h" + final_sd_cab + "Entry" + " > cab" + final_sd_cab + "Entry"
    else:
        allpath += "cab" + final_ft_cab + "Entry > h" + final_ft_cab + "Entry" 
        hallway = nearhallwayOne(currentfloorUp, hallway)
        allpath += hallway + " > h" + final_sd_cab + "Entry" + " > cab" + final_sd_cab + "Entry"

    return allpath