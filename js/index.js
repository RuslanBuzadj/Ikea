'use strict';
import generateFooter from './generateFooter.js';
import generateHeader from './generateHeader.js';
import generateCatalog from './generateCatalog.js';
import generateGoodsPage from './generateGoodsPage.js'
import { loadData } from './loadData.js';

generateCatalog();
generateHeader();
generateFooter();
generateGoodsPage();
loadData();