import React, {useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {FuseAnimateGroup} from '@fuse';
import {useDispatch, useSelector} from "react-redux";
import withReducer from 'app/store/withReducer';
import reducer from "../store/reducers";
import {Line} from "react-chartjs-2";
import useTheme from "@material-ui/core/styles/useTheme";
import Card from "@material-ui/core/Card";
import FuseAnimate from "../../../../@fuse/components/FuseAnimate/FuseAnimate";
import {getServices} from "../../Service/store/actions";

function ServicesCount() {
  const dispatch = useDispatch();
  const services = useSelector(({statServices}) => statServices.servicesReducer.data);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch])

  const theme = useTheme();
  const totalViews = services.reduce((acc, cur) => [...acc, ...cur.views], [])
  const day = 1000 * 60 * 60 * 24;
  const today = Date.now();
  const year = new Date().getFullYear();
  const weekViews = totalViews.filter((one) => (today - Date.parse(one)) / day < 7).length;

  function RegistersByMonth(list) {
    let byMonth = Array(12).fill(0);
    // eslint-disable-next-line array-callback-return
    list.map(one => {
      const date = new Date(Date.parse(one));
      const month = date.getMonth();
      if (date.getFullYear() === year) byMonth[month]++
    });
    return byMonth
  }

  return (
    <FuseAnimateGroup
      className="flex flex-wrap"
      enter={{
        animation: "transition.slideUpBigIn"
      }}
    >
      <div className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
        <Paper className="w-full rounded-8 shadow-none border-1">
          <div className="text-center pt-12 pb-28">
            <Typography
              className="text-60 leading-none text-blue">{services.length}</Typography>
            <Typography className="text-16" color="textSecondary">N° services</Typography>
          </div>
        </Paper>
      </div>
      <div className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
        <Paper className="w-full rounded-8 shadow-none border-1">
          <div className="text-center pt-12 pb-28">
            <Typography
              className="text-60 leading-none text-blue">{totalViews.length}</Typography>
            <Typography className="text-16" color="textSecondary">N° vues</Typography>
          </div>
        </Paper>
      </div>
      <div className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
        <Paper className="w-full rounded-8 shadow-none border-1">
          <div className="text-center pt-12 pb-28">
            <Typography
              className="text-60 leading-none text-blue-darker">+ {weekViews}</Typography>
            <Typography className="text-16" color="textSecondary">N° vues de cette semaine</Typography>
          </div>
        </Paper>
      </div>
      <Card className="w-full rounded-8 shadow-none border-1 p-12">
        <div className="container relative p-16 sm:p-24 flex flex-row justify-between items-center">

          <FuseAnimate delay={100}>
            <div className="flex-col">
              <Typography className="h2" color="textPrimary">N° vues par mois</Typography>
            </div>
          </FuseAnimate>
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
          <Line
            data={{
              labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUI', 'AOUT', 'SEP', 'OCT', 'NOV', 'DEC'],
              datasets: [{
                label: "N° vues",
                backgroundColor: "#3490DC",
                data: RegistersByMonth(totalViews),
                fill: 'start',
                borderColor: theme.palette.primary.main,
                // backgroundColor: theme.palette.primary.main,
                pointBackgroundColor: theme.palette.primary.dark,
                pointHoverBackgroundColor: theme.palette.primary.main,
                pointBorderColor: theme.palette.primary.contrastText,
                pointHoverBorderColor: theme.palette.primary.contrastText
              }]
            }}
            options={{
              "spanGaps": false,
              "legend": {"display": false},
              "maintainAspectRatio": false,
              "tooltips": {"position": "nearest", "mode": "index", "intersect": false},
              "layout": {"padding": {"left": 24, "right": 32}},
              "elements": {"point": {"radius": 4, "borderWidth": 2, "hoverRadius": 4, "hoverBorderWidth": 2}},
              "scales": {
                "xAxes": [{"gridLines": {"display": false}, "ticks": {"fontColor": "rgba(0,0,0,0.54)"}}],
                "yAxes": [{"gridLines": {"tickMarkLength": 16}, "ticks": {"stepSize": 1000}}]
              },
              "plugins": {"filler": {"propagate": false}}
            }}
          />
        </div>
      </Card>
    </FuseAnimateGroup>
  )
}

export default withReducer('statServices', reducer)(ServicesCount)
