import * as networkApi from './apicture/network';
import * as floodApi from './apicture/flood';
import * as overview from './apicture/overview';
import * as riverApi from './apicture/river';
import * as taskApi from './pipenetwork/task';
import * as engineeringApi from './pipenetwork/engineering'
import * as pipeApi from './pipenetwork/pipe'
import * as floodTaskApi from './flood/task'
import * as transferYaApi from './flood/transferYa'
import * as floodData from './flood/flood'
import * as envTaskApi from './environment/task'
import * as transferFaApi from './environment/transferFa'
import * as envOverview from './environment/overview'
import * as infoApi from './datacenter/info'
import * as dataBaseApi from './datacenter/dataBase'
import * as systemApi from './system/system'
import * as homeApi from './home/home'
import * as alarmApi from './alarm'
import * as newsApi from './news'
import * as publicApi from './public'
import * as reportApi from './flood/report'
import * as dutyApi from './flood/duty'
import * as floodManageApi from './flood/floodmange'
import * as staticApi from "./static"
import * as personnelApi from "./apicture/personnel"
import * as dredgeApi from "./dredge"
import * as planApi from "./assessment/plan"
import * as manageApi from "./assessment/manage"
import * as maintainApi from "./assessment/maintain"
import * as checkApi from "./assessment/check"
import * as configApi from "./assessment/config"
import * as maintenanceApi from "./maintenance";

export {
    homeApi,
    networkApi,
    floodApi,
    overview,
    riverApi,
    taskApi,
    engineeringApi,
    pipeApi,
    floodTaskApi,
    floodData,
    envTaskApi,
    envOverview,
    transferFaApi,
    transferYaApi,
    alarmApi,
    infoApi,
    dataBaseApi,
    systemApi,
    newsApi,
    publicApi,
    reportApi,
    dutyApi,
    floodManageApi,
    staticApi,
    personnelApi,
    dredgeApi,
    planApi,
    manageApi,
    maintainApi,
    checkApi,
    configApi,
    maintenanceApi
}

export default publicApi;  //区分export  和export default  区别