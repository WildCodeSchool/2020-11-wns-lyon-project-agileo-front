import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { gql, useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

interface DateModel {
    dateString: String;
    day: number;
    month: number;
    timestamp: number;
    year: number;
}

interface EventModel {
    endingDay: string,
    startingDay: string,
    note: string,
}


export default function CalendarComponent() {
    const FETCH_ALLEVENTS = gql`
        query allEvents {
            allEvents{
            notes,
            startingDay,
            endingDay
        }
    }
`;

    const CREATE_EVENT = gql`
        mutation createEvent(
            $endingDay: String!
            $startingDay: String!
            $notes: String!
        ) {
        createEvent(
            data: { endingDay: $endingDay, startingDay: $startingDay, notes: $notes }
        ) {
            endingDay
            startingDay
            notes
        }
    }
`;

const DELETE_EVENT = gql`
mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`;

    const [dataSubmit] = useMutation(CREATE_EVENT);
    const [dataDelete] = useMutation(DELETE_EVENT);
    const { data }: { data: { allEvents: EventModel[] } } = useQuery(FETCH_ALLEVENTS);
    const [text, onChangeText] = useState("");
    const [starting, onChangeStarting] = useState("");
    const [ending, onChangeEnding] = useState("");
    let setDataSubmita =[];

    const [selected, setSelected] = useState<DateModel | null>(null);
    const [month, setMonth] = useState(new Date())
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "July", "August", "September", "October", "November", "December"
    ];

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [toDel, setToDel] = useState("")
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const onDayPress = (day: DateModel) => {
        console.log(day)
        setSelected(day);
        let newDate = new Date(day.timestamp)
        setMonth(newDate)
        const chose = Object.keys(setDataSubmita[setDataSubmita.length-1]).find((item) => {
            console.log(item, day.dateString, item === day.dateString)
            return item === day.dateString
        })
        console.log("sdfhbizsbfuihbvfui", chose, setDataSubmita[setDataSubmita.length-1])
        setToDel(chose)
    };

    const onSubmit = async () => {
        const variables = {
            notes: text,
            startingDay: starting,
            endingDay: ending,
        }
        
        await dataSubmit({
            variables: variables
        });
        console.log(variables)
        onChangeStarting('')
        onChangeEnding('')
    }

    const onDelete = async (id) => {
        console.log(toDel)
        delete setDataSubmita[setDataSubmita.length-1][toDel]
        setDataSubmita = setDataSubmita[setDataSubmita.length-1]
        console.log("after del", setDataSubmita)
        const variables = {
            id: id,
        }
        await dataDelete({
            variables: variables
        });
        console.log(variables)
        // const result = window.confirm('Veux tu supprimer l\'évent?');
        // if (result) {
        //     alert("404 fonction delete not found");
        // } else {
        //     alert("Suppression de la suppression de l\'évent");
        // }
    }

    const getBetweenDays = (startingDay: string, endingDay: string): { [key: string]: { color: string, textColor: string } } => {
        const result = {}
        const tempDate = moment(startingDay);
        tempDate.add(1, 'day');
        while (tempDate.format('YYYY-MM-DD') < endingDay) {
            result[tempDate.format('YYYY-MM-DD')] = { color: '#0CADA6', textColor: 'gray' };
            tempDate.add(1, 'day');
        }
        //data.allEvents.map((item, index) => {
            
            // let retour;
            // let sliceOfDays = item.startingDay.charAt(item.startingDay.length - 2) + item.startingDay.charAt(item.startingDay.length - 1); //19
            // let afterSlice = item.startingDay.slice(0, -2); //2021-05-
            // let incrementSliceOfDays = Number(sliceOfDays)
            // while (item.endingDay !== retour) { //2021-05-26 !== 2021-05-19
            //     incrementSliceOfDays++; //20
            //     retour = afterSlice + incrementSliceOfDays.toString(); //2021-05 + 20
            //     [retour]: {color: '#0CADA6', textColor: 'gray'};
            // break;
            
        return result;
    }
    useEffect(() => {
        console.log('arr', setDataSubmita)
    }, [setDataSubmita])

    return (
        <View style={{ paddingTop: 50, flex: 1 }}>
            {data && <Calendar
                // Initially visible month. Default = Date()
                current={new Date()}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={new Date()}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={'2026-05-30'}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={onDayPress}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'MMMM yyyy'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                // renderArrow={(direction) => (<p>{">"}</p>)}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={true}
                // If hideArrows=false and hideExtraDays=false do not swich month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={true}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                enableSwipeMonths={true}

                // destructuration de l'objet data pour récupéré une à une les sorties de reduce (reduce qui renvoie d'abord l'objet dates vide et ensuite
                // donne un objet avec une startingday et un endingday, puis 2, puis 3 etc à chaque occurence) puis destructuration de selected date pour
                // créer un objet unique. Le [currente.starting etc] c'est une clé dynamique qui permet dynamiquement de créer un objet avec une valeur
                markedDates={{
                    ...data.allEvents.reduce((dates, currentItem: EventModel) => {
                        const machin = {
                            ...dates,
                            [currentItem.startingDay]: { startingDay: true, color: '#0CADA6', textColor: 'gray' },
                            [currentItem.endingDay]: { endingDay: true, color: '#0CADA6', textColor: 'gray' },
                            ...getBetweenDays(currentItem.startingDay, currentItem.endingDay)
                        };
                        setDataSubmita = [...setDataSubmita, machin]
                        console.log("datas", setDataSubmita)
                        return machin;
                    }, {}),
                    ...(selected ? {
                        [selected.dateString as string]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: 'orange',
                            selectedTextColor: 'red'
                        },
                    } : {}),
                }
                    // data.map((item, index) => ({
                    //     [item.startingDay]: {startingDay: true, color: '#0CADA6', textColor: 'gray'},
                    //     [item.endingDay]: {endingDay: true, color: '#0CADA6', textColor: 'gray'}
                    // }))
                    // '2021-04-16': { startingDay: true, color: '#0CADA6' },
                    // '2021-04-17': { color: '#9BDDDB' },
                    // '2021-04-18': { color: '#9BDDDB' },
                    // '2021-04-19': { selected: true, endingDay: true, color: '#0CADA6', textColor: 'gray' },
                    // '2021-04-24': { marked: true, dotColor: 'blue' },
                    // '2021-04-25': { marked: true, dotColor: 'green' },

                    // '2021-05-16': { startingDay: true, color: '#0CADA6' },
                    // '2021-05-17': { color: '#9BDDDB' },
                    // '2021-05-18': { color: '#9BDDDB' },
                    // '2021-05-19': { selected: true, endingDay: true, color: '#0CADA6', textColor: 'gray' },

                    // '2021-02-16': { startingDay: true, color: '#0CADA6' },
                    // '2021-02-17': { color: '#9BDDDB' },
                    // '2021-02-18': { color: '#9BDDDB' },
                    // '2021-02-19': { selected: true, endingDay: true, color: '#0CADA6', textColor: 'gray' },

                    // '2021-05-24': { marked: true, dotColor: 'blue' },
                    // '2021-05-25': { marked: true, dotColor: 'green' },
                    // '2021-05-26': { marked: true, color: '#870cad' },
                }
                markingType={'period'}

                style={{
                    boxShadow: "1px 1px 4px #969696",
                    borderRadius: 1,
                    height: 400,
                    width: "90%",
                    paddingTop: 20,
                    margin: 'auto'
                }}

                theme={{
                    backgroundColor: '#b64141',
                    calendarBackground: '#eeeeee',
                    textSectionTitleColor: '#1d4977',
                    textSectionTitleDisabledColor: '#014581',
                    selectedDayBackgroundColor: '#00ff22',
                    selectedDayTextColor: '#4eb353',
                    todayTextColor: '#1c851c',
                    dayTextColor: '#575d61',
                    textDisabledColor: '#d85e5e',
                    dotColor: '#00adf5',
                    selectedDotColor: '#fc0404',
                    arrowColor: '#0CADA6',
                    monthTextColor: '#242222',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '900',
                    textDayFontSize: 20,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 12,
                }}

            />}
            {selected ?
                <View style={{ padding: 20, marginTop: 15 }}>
                    <Text onPress={() => onDelete('i')} style={styles.delete}>Supprimer l'événement</Text>
                    <Text style={styles.displayDate}>{`Le ${selected.day} ${monthNames[month.getMonth()]} ${selected.year} `}</Text>
                    <Text style={styles.displayInfos}>{`il fait bon le ${selected.day}`}</Text>
                    <Text onPress={() => setSelected(null)} style={styles.delete}>Déséléctionner</Text>
                </View>
                : null
            }
            <View>
                <SafeAreaView style={{margin: "auto", width: "80vw", marginBottom: 15}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        placeholder="Note"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeStarting}
                        value={starting}
                        placeholder="2021-07-07"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEnding}
                        value={ending}
                        placeholder="2021-07-11"
                    />
                    <TouchableOpacity
                        onPress={onSubmit}
                        style={{borderRadius: 22, backgroundColor: "#0CADA6", padding: 15, width: "80vw"}}
                    >
                        <Text style={{textAlign: "center"}}>Soumettre</Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                        />
                    )}
                </SafeAreaView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 900,
        backgroundColor: '#d1d1d1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderRadius: 20,
        borderWidth: 1,
        padding: 15,
    },
    displayDate: {
        margin: "auto",
        textAlign: "center",
        padding: 30,
        fontSize: 22,
        fontWeight: '600',
    },
    displayInfos: {
        margin: "auto",
        textAlign: "center",
        fontSize: 22,
        fontWeight: '600',
    },
    delete: {
        marginTop: 10,
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '600',
        color: "#fc6161"
    },
});