function minuteDiff(dt2: Date, dt1: Date) 
{
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}

export default minuteDiff