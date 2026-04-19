export const checkTimeOverlap = (
  start1: number, end1: number, start2: number, end2: number
): boolean => start1 < end2 && start2 < end1;

export const checkDayOverlap = (
  meetingdays1: string, meetingdays2: string
): boolean => {
  let i = 0;
  while (i < meetingdays1.length) {
    let currentday = "";
    if (meetingdays1[i] === "T") {
      currentday = meetingdays1.slice(i, i +2);
      i += 2;
    }
    else {
      currentday = meetingdays1[i];
      i += 1;
    }

    if (meetingdays2.includes(currentday)) {
      return true;
    }

    }
  return false;
}

export const checkCourseOverlap = (
    coursemeeting1: string, coursemeeting2: string
) : boolean => {
    var [meetingday1, meetingtime1] = coursemeeting1.split(" ");
    var [meetingday2, meetingtime2] = coursemeeting2.split(" ");
    if (checkDayOverlap(meetingday1, meetingday2)) {
        const [[starthour1, startminute1], [endhour1, endminute1]] = meetingtime1.split("-").map(x => x.split(":"));
        const [[starthour2, startminute2], [endhour2, endminute2]] = meetingtime2.split("-").map(x => x.split(":"));
        const start1 = parseInt(starthour1) * 60 + parseInt(startminute1);
        const end1 = parseInt(endhour1) * 60 + parseInt(endminute1);
        const start2 = parseInt(starthour2) * 60 + parseInt(startminute2);
        const end2 = parseInt(endhour2) * 60 + parseInt(endminute2);

        return checkTimeOverlap(start1, end1, start2, end2);
    }
    return false
}

