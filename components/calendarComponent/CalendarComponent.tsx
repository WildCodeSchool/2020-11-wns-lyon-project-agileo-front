import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars';

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


export default function CalendarComponent() {
    const [selected, setSelected] = useState<DateModel | null>(null);
    const [month, setMonth] = useState(new Date())
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "July", "August", "September", "October", "November", "December"
    ];

    const onDayPress = (day: DateModel) => {
        setSelected(day);
        let newDate = new Date(day.timestamp)
        setMonth(newDate)
    };

    return (
        <View style={{ paddingTop: 50, flex: 1 }}>
            <Calendar
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

                markedDates={{
                    '2021-04-16': { startingDay: true, color: '#b3fab9' },
                    '2021-04-17': { color: '#b3fab9' },
                    '2021-04-18': { color: '#b3fab9' },
                    '2021-04-19': { selected: true, endingDay: true, color: '#b3fab9', textColor: 'gray' },
                    '2021-04-24': { marked: true, dotColor: 'blue' },
                    '2021-04-25': { marked: true, dotColor: 'green' },

                    '2021-05-16': { startingDay: true, color: '#b3fab9' },
                    '2021-05-17': { color: '#b3fab9' },
                    '2021-05-18': { color: '#b3fab9' },
                    '2021-05-19': { selected: true, endingDay: true, color: '#b3fab9', textColor: 'gray' },

                    '2021-02-16': { startingDay: true, color: '#b3fab9' },
                    '2021-02-17': { color: '#b3fab9' },
                    '2021-02-18': { color: '#b3fab9' },
                    '2021-02-19': { selected: true, endingDay: true, color: '#b3fab9', textColor: 'gray' },

                    '2021-05-24': { marked: true, dotColor: 'blue' },
                    '2021-05-25': { marked: true, dotColor: 'green' },

                    ...(selected ? {
                        [selected.dateString as string]: {
                            selected: true,
                            disableTouchEvent: true,
                            selectedColor: 'orange',
                            selectedTextColor: 'red'
                        },
                    } : {}),
                }}
                markingType={'period'}

                style={{
                    boxShadow: "1px 1px 4px #969696",
                    borderRadius: 10,
                    height: 400,
                    width: "90%",
                    paddingTop: 20,
                    margin: 'auto'
                }}

                theme={{
                    backgroundColor: '#b64141',
                    calendarBackground: '#d4d4d4',
                    textSectionTitleColor: '#1d4977',
                    textSectionTitleDisabledColor: '#014581',
                    selectedDayBackgroundColor: '#00ff22',
                    selectedDayTextColor: '#4eb353',
                    todayTextColor: '#1c851c',
                    dayTextColor: '#575d61',
                    textDisabledColor: '#d85e5e',
                    dotColor: '#00adf5',
                    selectedDotColor: '#fc0404',
                    arrowColor: 'green',
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

            />
            {selected ?
                <View style={{ backgroundColor: '#ffffff', padding: 20, marginTop: 15 }}>
                    <Text style={styles.displayDate}>{`Le ${selected.day} ${monthNames[month.getMonth()]} ${selected.year} `}</Text>
                    <Text style={styles.displayInfos}>{`il fait bon le ${selected.day}`}</Text>
                    <Text onPress={() => setSelected(null)} style={styles.delete}>Déséléctionner</Text>
                </View>
                : null
            }
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