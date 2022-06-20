import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Theme from '../../common/context/Theme';
import '../css/NoteList.css';

const NotePreview = ({object}) => {

    const history = useHistory();

    const onClick = () => {
        history.push("/nota");
    }

    const {theme, setTheme} = useContext(Theme);

    return(
        <li className={theme ? "notePreview-dark" :  "notePreview"} onClick={onClick}>  
            <h1>{object.title}</h1>
            <div/>
            <span>{object.title}</span>
        </li>
    );

}

export default NotePreview;