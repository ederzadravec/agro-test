import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'

import swagger from '#config/swagger'
import { middleware } from '#start/kernel'

router.post('session', '#controllers/session_controller.store')
router.resource('productor', '#controllers/productor_controller').use('*', middleware.auth())
router.resource('info-state', '#controllers/info_state_controller').use('*', middleware.auth())
router.resource('farm', '#controllers/farm_controller').use('*', middleware.auth())
router.resource('harvest', '#controllers/harvest_controller').use('*', middleware.auth())
router
  .resource('cultivated-plant', '#controllers/cultivated_plant_controller')
  .use('*', middleware.auth())

router.get('dashboard/total', '#controllers/dashboard_controller.total')
router.get('dashboard/by-state', '#controllers/dashboard_controller.byState')
router.get('dashboard/by-cultivated-plant', '#controllers/dashboard_controller.byCultivatedPlant')

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
