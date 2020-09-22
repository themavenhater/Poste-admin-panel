import React, {useEffect} from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import SerivcesTable from './ServicesTable';
import ServicesHeader from './ServicesHeader';
import reducer from '../store/reducers';
import * as Actions from "../store/actions";
import {useDispatch} from "react-redux";

function Services()
{
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(Actions.getCategories());
    dispatch(Actions.getServices());
  }, [dispatch]);

    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ServicesHeader/>
            }
            content={
                <SerivcesTable />
            }
            innerScroll
        />
    );
}

export default withReducer('postApp', reducer)(Services);
