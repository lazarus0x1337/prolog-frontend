export const style = {
    borderRadius: "20px",
    // color: 'var(--color-font-hover)',
    // backgroundColor: 'var(--color-list)',
    color: '#000000',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    p: 4,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '90vh', // définit une hauteur maximale de 90% de la hauteur de la fenêtre
    overflow: 'auto', // ajoute une barre de défilement si le contenu dépasse la hauteur maximale
    '&::-webkit-scrollbar': {
        width: '7px', /* largeur de la barre de défilement */
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'var(--color-font-hover)', /* couleur du pouce */
        borderRadius: '5px', /* rayon des coins */
    },
    '&::-moz-scrollbar': {
        width: '7px', /* largeur de la barre de défilement Firefox */
    },
    '&::-moz-scrollbar-thumb': {
        backgroundColor: 'var(--color-font-hover)', /* couleur du pouce */
        borderRadius: '5px', /* rayon des coins */
    },
}

export const style_Tracking = {
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
    maxHeight: '35vh',
    borderBottom: '1px solid black',
}