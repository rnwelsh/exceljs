import XmlStream from '../../../utils/xml-stream.js';
import * as utils from '../../../utils/utils.js';
import BaseXform from '../base-xform.js';

import CommentXform from './comment-xform.js';

const CommentsXform = (function CommentsXform() {
  this.map = {
    comment: new CommentXform(),
  };
});

utils.inherits(
  CommentsXform,
  BaseXform,
  {
    COMMENTS_ATTRIBUTES: {
      xmlns: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
    },
  },
  {
    render(xmlStream, model) {
      model = model || this.model;
      xmlStream.openXml(XmlStream.StdDocAttributes);
      xmlStream.openNode('comments', CommentsXform.COMMENTS_ATTRIBUTES);

      // authors
      // TODO: support authors properly
      xmlStream.openNode('authors');
      xmlStream.leafNode('author', null, 'Author');
      xmlStream.closeNode();

      // comments
      xmlStream.openNode('commentList');
      model.comments.forEach(comment => {
        this.map.comment.render(xmlStream, comment);
      });
      xmlStream.closeNode();
      xmlStream.closeNode();
    },

    parseOpen(node) {
      if (this.parser) {
        this.parser.parseOpen(node);
        return true;
      }
      switch (node.name) {
        case 'commentList':
          this.model = {
            comments: [],
          };
          return true;
        case 'comment':
          this.parser = this.map.comment;
          this.parser.parseOpen(node);
          return true;
        default:
          return false;
      }
    },
    parseText(text) {
      if (this.parser) {
        this.parser.parseText(text);
      }
    },
    parseClose(name) {
      switch (name) {
        case 'commentList':
          return false;
        case 'comment':
          this.model.comments.push(this.parser.model);
          this.parser = undefined;
          return true;
        default:
          if (this.parser) {
            this.parser.parseClose(name);
          }
          return true;
      }
    },
  }
);

export default CommentsXform