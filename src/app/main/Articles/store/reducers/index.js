import {combineReducers} from "redux";
import articlesReducer from './articles.reducer'
import articleReducer from "./article.reducer"

const reducer = combineReducers({
    articlesReducer,
    articleReducer
});

export default reducer;