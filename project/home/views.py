#################
#### imports ####
#################

from project import app, db
from project.models import Food
from flask import flash, redirect, session, url_for, render_template, Blueprint, request
from functools import wraps
from project.form import OrderForm

################
#### config ####
################

home_blueprint = Blueprint(
    'home', __name__,
    template_folder='templates'
)


##########################
#### helper functions ####
##########################


def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('Please login first.')
            return redirect(url_for('users.home'))
    return wrap


################
#### routes ####
################

@home_blueprint.route('/order', methods=['GET', 'POST'])
@login_required
def order():
    menu = ["AA_burger", "chicken_clucker"]
    form = OrderForm()
    if request.method == 'POST':
        if form.validate_on_submit:
            string_data = '\n'.join(["item "+str(form.item.data), "patty "+str(form.patty.data),
                                    "no bun "+str(form.nobun.data), "cheese "+str(form.cheese.data),
                                    "bacon "+str(form.bacon.data)])
            # print(string_data)
            return redirect(url_for('home.success'))
    def length(a):
        return len(a)
    return render_template('order.html', form=form, title="Hungry? Order Now!",\
                                         menu=menu, len=length, username=session['username'])

@home_blueprint.route('/success')
@login_required
def success():
    return render_template('success.html', title="Order Placed!")
