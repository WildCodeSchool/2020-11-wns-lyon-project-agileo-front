import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client';
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
    notes: string,
    id: number;
}


export default function CalendarComponent() {
    const FETCH_ALLEVENTS = gql`
        query allEvents {
            allEvents{
            notes,
            startingDay,
            endingDay,
            id
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

    const [dataSubmit] = useMutation(CREATE_EVENT, {
        // Then re-run 
        refetchQueries: [
          { query: FETCH_ALLEVENTS }
        ]
      });
    const [dataDelete] = useMutation(DELETE_EVENT, {
        // Then re-run 
        refetchQueries: [
          { query: FETCH_ALLEVENTS }
        ]
      });
    
    const { data }: { data: { allEvents: EventModel[] } } = useQuery(FETCH_ALLEVENTS);
    const [text, onChangeText] = useState("");
    const [starting, onChangeStarting] = useState("");
    const [ending, onChangeEnding] = useState("");
    const [load, setLoad] = useState(false);
    let setDataSubmita =[];
    //console.log(data)

    const [selected, setSelected] = useState<DateModel | null>(null);
    const [month, setMonth] = useState(new Date())
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "July", "August", "September", "October", "November", "December"
    ];

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [toDel, setToDel] = useState({})
  
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
        setSelected(day);
        let newDate = new Date(day.timestamp)
        setMonth(newDate)



        
        const chose = setDataSubmita.map((item) => {
            return item
        })
        const newObject = Object.entries(chose[0]).filter((d, index)=> d[0] === day.dateString)
        if (newObject.length) {
            setToDel(newObject[0][1])
        }
        if (newObject === [])
            setToDel([])
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
        onChangeStarting('')
        onChangeEnding('')
        onChangeText('')
        setLoad(true)
        //window.location.reload(false);
    }

    const onDelete = async (id) => {
        const variables = {
            id: toDel.id,
        }
        await dataDelete({
            variables: variables
        });
        setLoad(true)
        //window.location.reload(false);
        // const result = window.confirm('Veux tu supprimer l\'évent?');
        // if (result) {
        //     alert("404 fonction delete not found");
        // } else {
        //     alert("Suppression de la suppression de l\'évent");
        // }
    }

    const getBetweenDays = (startingDay: string, endingDay: string, notes: string, id: number): { [key: string]: { color: string, textColor: string, notes: string, id: number } } => {
        const result = {}
        const tempDate = moment(startingDay);
        tempDate.add(1, 'day');
        while (tempDate.format('YYYY-MM-DD') < endingDay) {
            result[tempDate.format('YYYY-MM-DD')] = { color: '#0CADA6', textColor: 'gray', notes, id};
            tempDate.add(1, 'day');
        }

            
        return result;
    }


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
                            [currentItem.startingDay]: { startingDay: true, color: '#0CADA6', textColor: 'gray', notes: currentItem.notes, id: currentItem.id },
                            [currentItem.endingDay]: { endingDay: true, color: '#0CADA6', textColor: 'gray', notes: currentItem.notes, id: currentItem.id},
                            ...getBetweenDays(currentItem.startingDay, currentItem.endingDay, currentItem.notes, currentItem.id)
                        };
                        setDataSubmita = [machin]
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
                    <Text style={styles.displayInfos}>{toDel.notes}</Text>
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