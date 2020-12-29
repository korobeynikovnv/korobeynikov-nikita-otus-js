import minimist from 'minimist';
import { resolve, relative, parse, extname } from 'path';
import { readdir} from 'fs';
import { promisify } from 'util'
const readDirASync = promisify(readdir);
const args = minimist(process.argv);
const fullPath = resolve(args['path']);

/**
 * viewModel для просмотра содержимого папки
 * @typedef {Object} Content
 * @property {string[]} files
 * @property {string[]} folders
 */

/**
 * Вывести в консоль содержимое папки рекурсивно
 * @param {string} path 
 */
async function getContent(path){
	let content = await readFolder(path, path);

	console.log(JSON.stringify(content));
}

/**
 * Считать содержимое папки рекурсивно
 * @param {string} current 
 * @param {string} root
 * @return {Promise<Content>}
 */
async function readFolder(current, root){

	/** @type{Content} */
	let content = {
		files: [],
		folders : []
	}

	let results = await readDirASync(current);
	for (let result of results){
		let isFile = extname(result) !== '';
		let fullPath = resolve(current, result);
		let display = relative(parse(root).dir, fullPath);

		if (isFile){
			content.files.push(display);
			continue;
		}

		//Проверяем папку и всё вложенное в неё
		content.folders.push(display);		
		let innerContent = await readFolder(fullPath, root);
		content.files = content.files.concat(innerContent.files);
		content.folders = content.folders.concat(innerContent.folders);
	}

	return content;
}


getContent(fullPath);