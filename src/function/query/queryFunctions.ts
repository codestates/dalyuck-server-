export const insertIntoOtherCalendar = (userId: number, calendarId: number):string => {
  return `INSERT INTO other_calendar(
    userId,
    calendarName,
    colour,
    description
  )
  VALUES(
    ${userId},
    (SELECT calendarName FROM calendar WHERE calendar.id = ${calendarId}),
    (SELECT colour FROM calendar WHERE calendar.id = ${calendarId}),
    (SELECT description FROM calendar WHERE calendar.id = ${calendarId})
  )`
};

export const insertIntoOtherEvent = (colour: string, otherCalendarId: number, calendarId: number):string => {
  return `INSERT INTO other_event(
    startTime, endTime, eventName, description, access, location, colour, otherCalendarId
  )
  SELECT startTime, endTime, eventName, description, access, location, '${colour}', ${otherCalendarId}
  FROM event
  WHERE event.calendarId = ${calendarId}`
};

export const addTriggerAfterInsertEvent = (userId: number, otherCalendarId: number, calendarId: number, colour: string):string => {
  return `CREATE TRIGGER after_event_insert_${userId}_${otherCalendarId}
  AFTER INSERT
  ON event FOR EACH ROW
  BEGIN
    IF NEW.calendarId = ${calendarId} THEN
      INSERT INTO other_event(startTime, endTime, eventName, description, access, location, colour, otherCalendarId)
      VALUES (new.startTime, new.endTime, new.eventName, new.description, new.access, new.location, '${colour}', ${otherCalendarId});
    END IF;
  END`
};

export const addTriggerAfterUpdateEvent = (userId: number, otherCalendarId: number, calendarId: number):string => {
  return `CREATE TRIGGER after_event_update_${userId}_${otherCalendarId}
  AFTER UPDATE
  ON event FOR EACH ROW
  BEGIN
    IF NEW.calendarId = ${calendarId} THEN
      UPDATE other_event
      SET startTime=new.startTime, endTime=new.endTime, eventName=new.eventName, description=new.description, access=new.access, location=new.location
      WHERE startTime=old.startTime AND endTime=old.endTime;
    END IF;
  END`
};

export const addTriggerAfterDeleteEvent = (userId: number, otherCalendarId: number, calendarId: number):string => {
  return `CREATE TRIGGER after_event_delete_${userId}_${otherCalendarId}
  AFTER DELETE
  ON event FOR EACH ROW
  BEGIN
    IF old.calendarId = ${calendarId} THEN
      DELETE FROM other_event WHERE startTime=old.startTime AND endTime=old.endTime;
    END IF;
  END`
};
