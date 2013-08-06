// Generated by CoffeeScript 1.6.3
(function() {
  if (!nunjucks.env) {
    nunjucks.env = new nunjucks.Environment(new nunjucks.HttpLoader('/static/templates'));
  }

  X.render = function(tpl, ctx) {
    if (ctx == null) {
      ctx = {};
    }
    tpl = nunjucks.env.getTemplate(tpl);
    return tpl.render(ctx);
  };

  X.macro = function(name, ctx, tpl) {
    if (ctx == null) {
      ctx = {};
    }
    if (tpl == null) {
      tpl = 'macros.html';
    }
    return nunjucks.env.getTemplate(tpl).getExported()[name](ctx);
  };

  $(function() {
    var $doc;
    $doc = $(document);
    $doc.ajaxSuccess(function(event, xhr, settings) {
      var e, evt, json;
      try {
        if ((xhr.getResponseHeader("content-type") || '').toLowerCase().indexOf('json') > -1) {
          json = JSON.parse(xhr.responseText);
          if (!_.isEmpty(json.flash)) {
            evt = $.Event("flash", {
              flash: json.flash
            });
            $doc.trigger(evt);
            if (!evt.isDefaultPrevented()) {
              if (evt.flash) {
                X.flash(evt.flash);
              }
            }
          }
          if (json.redirect) {
            evt = $.Event("redirect", {
              redirect: json.redirect
            });
            $doc.trigger(evt);
            if (!evt.isDefaultPrevented()) {
              window.location = evt.redirect;
              event.stopImmediatePropagation();
              return event.stopPropagation();
            }
          }
        }
      } catch (_error) {
        e = _error;
      }
    });
  });

  X.flash = function(flashes) {
    var $cont, deduped;
    $cont = $("body div.flash-container");
    deduped = {};
    _.each(flashes, function(messages, type) {
      deduped[type] = [];
      _.each(messages, function(text) {
        var $existing;
        $existing = $cont.find(".alert-" + type + ":visible .msg:contains('" + text + "')");
        if ($existing.length) {
          return $existing.next().text(function(i, str) {
            return 'x' + (str ? parseInt(str.slice(1), 10) + 1 : 2);
          });
        } else {
          return deduped[type].push(text);
        }
      });
      if (deduped[type].length === 0) {
        return delete deduped[type];
      }
    });
    if (!_.isEmpty(deduped)) {
      $cont.append(X.macro('flash', deduped));
      return Behavior2.contentChanged('flash');
    }
  };

  Behavior2.Class('flash', 'body div.flash-container .alert', function($ctx, that) {
    return setTimeout(function() {
      return $ctx.fadeOut('slow');
    }, 4200);
  });

  Behavior2.Class('flashContainer', 'body div.flash-container', function($ctx, that) {
    return $ctx.scrollToFixed({
      marginTop: 40
    });
  });

}).call(this);

/*
//@ sourceMappingURL=default.map
*/
