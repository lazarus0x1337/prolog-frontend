let a=new Date();
const info_colis = [
    { date: a.getDate()+':'+a.getMonth()+':'+a.getFullYear(),
        heure:a.getHours()+':'+a.getMinutes(),
        Dest: "casa",
        Origin: "agadir",
        status : "Arrived at"
    },
    { date: a.getDate()+':'+a.getMonth()+':'+a.getFullYear(),
        heure:a.getHours()+':'+a.getMinutes(),
        Dest: "marrakech",
        Origin: "agadir",
        status : "Arrived at"
    },
    {

        date: a.getDate()+':'+a.getMonth()+':'+a.getFullYear(),
        heure:a.getHours()+':'+a.getMinutes(),
        Dest: "casa",
        Origin: "agadir",
        status:"Pre-Shipment Info Sent to"
    },

];

export default info_colis;
