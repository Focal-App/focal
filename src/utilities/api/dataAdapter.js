import { formatDate, stringIsDate, formatToISOString, formatDateToLocaleDate } from "utilities/date";
import { convertPenniesToDollars, convertDollarsToPennies } from "utilities/price";

export const DefaultText = {
    noContent: "-",
    nothing: ""
}

class DataAdapter {
    static setValidValue = (value, defaultValue = DefaultText.noContent) => {
        return value ? value : defaultValue;
    }

    static toUserModel = (apiUser) => {
        const { avatar, email, first_name, uuid } = apiUser;
        return {
            avatar,
            email,
            first_name,
            uuid
        }
    }

    static toContactModel = (apiModel) => {
        if (apiModel) {
            const { first_name, last_name, email, phone_number, label, best_time_to_contact, uuid } = apiModel;
            return {
                first_name: this.setValidValue(first_name),
                last_name: this.setValidValue(last_name),
                email: this.setValidValue(email),
                phone_number: this.setValidValue(phone_number),
                label: this.setValidValue(label),
                best_time_to_contact: this.setValidValue(best_time_to_contact),
                uuid
            }
        }
        const initialEmptyContact = {
            first_name: DefaultText.noContent,
            last_name: DefaultText.noContent,
            email: DefaultText.noContent,
            phone_number: DefaultText.noContent,
            label: DefaultText.noContent,
            best_time_to_contact: DefaultText.noContent,
        }
        return initialEmptyContact;
    }

    static toClientModel = (apiClient) => {
        const { contacts, private_notes, uuid } = apiClient;
        if (contacts && contacts.length === 1) {
            contacts.push(this.toContactModel());
        }
        return {
            contacts: contacts.map((contact) => this.toContactModel(contact)),
            private_notes: this.setValidValue(private_notes),
            uuid
        }
    }

    static toTaskModel = (apiTask) => {
        const { category, is_completed, step, uuid } = apiTask;
        return {
            category: this.setValidValue(category),
            is_completed,
            step: this.setValidValue(step),
            uuid
        }
    }

    static toWorkflowModel = (apiWorkflow) => {
        const { order, uuid, workflow_name, completed_tasks, incomplete_tasks, tasks } = apiWorkflow;
        return {
            uuid,
            order,
            workflow_name,
            completed_tasks,
            incomplete_tasks,
            tasks: tasks.map(task => this.toTaskModel(task))
        }
    }

    static toEventModel = (apiEvent, type = "event") => {
        if (apiEvent) {
            const { 
                event_name, 
                package_uuid, 
                shoot_date, 
                uuid,
                blog_link,
                edit_image_deadline,
                gallery_link,
                notes,
                shoot_location,
                shoot_time,
                reception_location,
                wedding_location,
                coordinator_name
            } = apiEvent;
    
            const baseEvent = {
                event_name: this.setValidValue(event_name),
                package_uuid,
                shoot_date: shoot_date ? formatDate(shoot_date) : DefaultText.noContent,
                uuid,
                blog_link: this.setValidValue(blog_link),
                gallery_link: this.setValidValue(gallery_link),
                notes: this.setValidValue(notes),
                edit_image_deadline: edit_image_deadline ? formatDate(edit_image_deadline) : DefaultText.noContent,
                shoot_time: this.setValidValue(shoot_time),
            }
            if (event_name.match(/wedding/i)) {
                const weddingEvent = {
                    reception_location: this.setValidValue(reception_location),
                    wedding_location: this.setValidValue(wedding_location),
                    coordinator_name: this.setValidValue(coordinator_name),
                }
                return Object.assign(baseEvent, weddingEvent)
            } else {
                const event = {
                    shoot_location: shoot_location ? shoot_location : DefaultText.noContent,
                }
                return Object.assign(baseEvent, event)
            }
        }
        if (type === "event") {
            const initialEmptyEngagementEvent = {
                event_name: "Engagement",
                shoot_date: DefaultText.noContent,
                blog_link: DefaultText.noContent,
                gallery_link: DefaultText.noContent,
                notes: DefaultText.noContent,
                edit_image_deadline: DefaultText.noContent,
                shoot_time: DefaultText.noContent,
                shoot_location: DefaultText.noContent,
            }
            return initialEmptyEngagementEvent;
        } else {
            const initialEmptyWeddingEvent = {
                event_name: "Wedding",
                shoot_date: DefaultText.noContent,
                blog_link: DefaultText.noContent,
                gallery_link: DefaultText.noContent,
                notes: DefaultText.noContent,
                edit_image_deadline: DefaultText.noContent,
                shoot_time: DefaultText.noContent,
                reception_location: DefaultText.noContent,
                wedding_location: DefaultText.noContent,
                coordinator_name: DefaultText.noContent,
            }
            return initialEmptyWeddingEvent;
        }
    }

    static toPackageModel = (apiPackage) => {
        if (apiPackage) {
            const { 
                package_name, 
                uuid, 
                proposal_signed,
                package_contents,
                package_price,
                retainer_price,
                retainer_paid_amount,
                retainer_paid,
                discount_offered,
                balance_remaining,
                balance_received,
                wedding_included,
                engagement_included,
                upcoming_shoot_date
            } = apiPackage;

            return {
                package_name: this.setValidValue(package_name, DefaultText.nothing),
                proposal_signed,
                package_contents: this.setValidValue(package_contents, DefaultText.nothing),
                package_price: package_price >= 0 ? convertPenniesToDollars(package_price) : DefaultText.noContent,
                retainer_price: retainer_price >= 0 ? convertPenniesToDollars(retainer_price) : DefaultText.noContent,
                retainer_paid_amount: retainer_paid_amount >= 0 ? convertPenniesToDollars(retainer_paid_amount) : DefaultText.noContent,
                retainer_paid,
                discount_offered: discount_offered >= 0 ? convertPenniesToDollars(discount_offered) : DefaultText.noContent,
                balance_remaining: balance_remaining >= 0 ? convertPenniesToDollars(balance_remaining) : DefaultText.noContent,
                balance_received,
                uuid,
                upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) :  DefaultText.noContent,
                wedding_included,
                engagement_included
            }
        }

        const initialEmptyPackage = {
            package_events: [],
            package_name: DefaultText.nothing,
            upcoming_shoot_date: DefaultText.noContent,
            proposal_signed: false,
            package_contents: DefaultText.nothing,
            package_price: convertPenniesToDollars(0),
            retainer_price: convertPenniesToDollars(0),
            retainer_paid_amount: convertPenniesToDollars(0),
            retainer_paid: false,
            discount_offered: convertPenniesToDollars(0),
            balance_remaining: convertPenniesToDollars(0),
            balance_received: false,
            wedding_included: false,
            engagement_included: false
        }
        return initialEmptyPackage;
    }

    static toFullClientDataModel = (client) => {
        const data = {
            client: this.toClientModel(client),
            current_stage: this.toTaskModel(client.current_stage),
            package: this.toPackageModel(client.package),
            events: (client.package && client.package.package_events) ? client.package.package_events.map(event => this.toEventModel(event)) : [],
            workflows: client.workflows.map(workflow => this.toWorkflowModel(workflow)).sort(workflow => workflow.order)
        }

        return data;
    }

    static toPartialClientDataModel = (apiClient) => {
        const { client_first_name, partner_first_name, package_name, current_stage, upcoming_shoot_date, uuid } = apiClient;
        return {
            partner_first_name: this.setValidValue(partner_first_name),
            client_first_name: this.setValidValue(client_first_name),
            package_name: this.setValidValue(package_name),
            current_stage: this.toTaskModel(current_stage),
            upcoming_shoot_date: upcoming_shoot_date ? formatDate(upcoming_shoot_date) : DefaultText.noContent,
            uuid
        }
    }

    static toAllClientDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toFullClientDataModel(client))
    }

    static toAllClientPartialDataModel = (apiUserClients) => {
        if (apiUserClients.length === 0) {
            return [];
        }

        return apiUserClients.map(client => this.toPartialClientDataModel(client));
    }

    static toApiReadyClient = (values) => {
        const apiReadyData = Object.assign({}, values);
        Object.keys(apiReadyData).forEach(key => {
            const value = apiReadyData[key];

            if (Array.isArray(value)) {
                return apiReadyData[key] = value.map(singleVaue => DataAdapter.toApiReadyClient(singleVaue))
            }

            if (typeof value === 'object') {
                return apiReadyData[key] = DataAdapter.toApiReadyClient(value)
            }

            if (typeof value === 'boolean') {
                return apiReadyData[key] = value;
            }

            if (value === DefaultText.noContent || value === DefaultText.nothing) {
                return apiReadyData[key] = null;
            }

            if (Number(value) || value === "0.00") {
                return apiReadyData[key] = convertDollarsToPennies(value);
            }
            
            if (stringIsDate(value, "MMMM DD, YYYY") || stringIsDate(value, "YYYY-MM-DD")) {
                return apiReadyData[key] = formatToISOString(value);
            }
        })

        return apiReadyData;
    }

    static toFormReadyData = (values) => {
        const dateType = ['shoot_date', 'edit_image_deadline']
        const formReadyData = Object.assign({}, values);
        Object.keys(formReadyData).forEach(key => {
            const value = formReadyData[key];
            
            if (Array.isArray(value)) {
                return formReadyData[key] = value.map(singleVaue => DataAdapter.toFormReadyData(singleVaue))
            }

            if (typeof value === 'object') {
                return formReadyData[key] = DataAdapter.toFormReadyData(value)
            }

            if (dateType.includes(key) || stringIsDate(value, "MMMM DD, YYYY")) {
                return formReadyData[key] = value === DefaultText.noContent ? "" : formatDateToLocaleDate(value)
            }

            if (value === DefaultText.noContent || value === DefaultText.nothing) {
                return formReadyData[key] = undefined;
            }
        })

        return formReadyData;
    }
}

export default DataAdapter;